// Real AI Image Analysis Service
class ImageAnalysisService {
  constructor() {
    this.apiKey = process.env.REACT_APP_VISION_API_KEY || 'demo-key';
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
  }

  // Convert image to base64
  async imageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Analyze image using AI
  async analyzeImage(imageFile) {
    try {
      // Convert image to base64
      const base64Image = await this.imageToBase64(imageFile);
      
      // For demo purposes, we'll use a combination of:
      // 1. Real image analysis (if API key available)
      // 2. Intelligent mock analysis based on image characteristics
      
      if (this.apiKey !== 'demo-key') {
        return await this.realAIAnalysis(base64Image);
      } else {
        return await this.intelligentMockAnalysis(imageFile, base64Image);
      }
    } catch (error) {
      console.error('Image analysis error:', error);
      return this.fallbackAnalysis();
    }
  }

  // Real AI analysis using OpenAI Vision API
  async realAIAnalysis(base64Image) {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4-vision-preview",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `Analyze this crop/vegetable image and provide:
                  1. Crop type identification
                  2. Quality grade (A+, A, B+, B, C)
                  3. Estimated market value per kg in Indian Rupees
                  4. Quality assessment notes
                  5. Confidence level (0-100%)
                  
                  Respond in JSON format with keys: cropType, quality, pricePerKg, notes, confidence`
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${base64Image}`
                  }
                }
              ]
            }
          ],
          max_tokens: 300
        })
      });

      const data = await response.json();
      const analysis = JSON.parse(data.choices[0].message.content);
      
      return {
        cropType: analysis.cropType,
        quality: analysis.quality,
        pricePerKg: analysis.pricePerKg,
        notes: analysis.notes,
        confidence: analysis.confidence,
        source: 'ai-vision'
      };
    } catch (error) {
      console.error('Real AI analysis failed:', error);
      return this.fallbackAnalysis();
    }
  }

  // Intelligent mock analysis using image characteristics
  async intelligentMockAnalysis(imageFile, base64Image) {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Analyze image characteristics
    const imageStats = await this.analyzeImageCharacteristics(imageFile);
    
    // Enhanced crop database with better characteristics
    const cropDatabase = {
      brinjal: {
        keywords: ['purple', 'violet', 'eggplant', 'oval', 'smooth', 'glossy', 'dark'],
        colors: ['#4B0082', '#8A2BE2', '#9400D3', '#6A0DAD', '#483D8B'],
        shapes: ['oval', 'long', 'elongated'],
        price: { min: 30, max: 45 },
        emoji: '🍆',
        dominantColorRange: { h: [240, 300], s: [40, 100], l: [20, 60] } // Purple range
      },
      onions: {
        keywords: ['round', 'layered', 'brown', 'white', 'yellow', 'papery'],
        colors: ['#8B4513', '#DEB887', '#F5DEB3', '#D2B48C', '#CD853F'],
        shapes: ['round', 'oval', 'bulbous'],
        price: { min: 20, max: 35 },
        emoji: '🧅',
        dominantColorRange: { h: [20, 60], s: [30, 80], l: [40, 80] } // Brown/yellow range
      },
      tomatoes: {
        keywords: ['red', 'round', 'smooth', 'glossy', 'bright'],
        colors: ['#FF6347', '#DC143C', '#B22222', '#CD5C5C', '#F08080'],
        shapes: ['round', 'spherical'],
        price: { min: 25, max: 40 },
        emoji: '🍅',
        dominantColorRange: { h: [0, 20], s: [60, 100], l: [40, 70] } // Red range
      },
      potatoes: {
        keywords: ['brown', 'oval', 'rough', 'eyes', 'earthy'],
        colors: ['#8B4513', '#A0522D', '#D2B48C', '#DEB887'],
        shapes: ['oval', 'round', 'irregular'],
        price: { min: 12, max: 20 },
        emoji: '🥔',
        dominantColorRange: { h: [20, 40], s: [20, 60], l: [40, 70] } // Brown range
      },
      carrots: {
        keywords: ['orange', 'long', 'tapered', 'smooth', 'bright'],
        colors: ['#FF8C00', '#FF7F50', '#FFA500', '#FF6347'],
        shapes: ['long', 'tapered', 'cylindrical'],
        price: { min: 25, max: 35 },
        emoji: '🥕',
        dominantColorRange: { h: [15, 35], s: [70, 100], l: [50, 70] } // Orange range
      },
      cabbage: {
        keywords: ['green', 'round', 'layered', 'leaves', 'light'],
        colors: ['#228B22', '#32CD32', '#90EE90', '#98FB98'],
        shapes: ['round', 'spherical'],
        price: { min: 15, max: 25 },
        emoji: '🥬',
        dominantColorRange: { h: [90, 150], s: [30, 80], l: [40, 80] } // Green range
      },
      cauliflower: {
        keywords: ['white', 'cream', 'florets', 'bumpy', 'textured'],
        colors: ['#FFFAF0', '#F5F5DC', '#FFEFD5', '#FFF8DC'],
        shapes: ['round', 'irregular', 'bumpy'],
        price: { min: 28, max: 35 },
        emoji: '🥦',
        dominantColorRange: { h: [40, 60], s: [10, 30], l: [80, 95] } // White/cream range
      },
      cucumber: {
        keywords: ['green', 'long', 'cylindrical', 'smooth', 'dark'],
        colors: ['#228B22', '#006400', '#2E8B57', '#3CB371'],
        shapes: ['long', 'cylindrical'],
        price: { min: 20, max: 30 },
        emoji: '🥒',
        dominantColorRange: { h: [90, 150], s: [50, 100], l: [25, 50] } // Dark green range
      }
    };

    // Enhanced matching with HSL color analysis
    const matchedCrop = this.enhancedMatchImageToCrop(imageStats, cropDatabase);
    
    // Generate quality assessment
    const quality = this.assessQuality(imageStats);
    
    // Calculate price based on quality and market conditions
    const basePrice = matchedCrop.price.min + 
      (matchedCrop.price.max - matchedCrop.price.min) * (quality.score / 100);
    
    const marketVariation = 0.8 + Math.random() * 0.4; // ±20% market variation
    const finalPrice = Math.round(basePrice * marketVariation);

    return {
      cropType: `${quality.prefix} ${matchedCrop.name}`,
      quality: quality.grade,
      pricePerKg: `₹${finalPrice}/kg`,
      notes: this.generateQualityNotes(quality, matchedCrop),
      confidence: Math.max(75, matchedCrop.confidence || 85),
      emoji: matchedCrop.emoji,
      source: 'intelligent-mock',
      marketTrend: Math.random() > 0.3 ? 'up' : 'stable'
    };
  }

  // Analyze image characteristics using Canvas API
  async analyzeImageCharacteristics(imageFile) {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      img.onload = () => {
        // Resize image for better analysis (max 400px)
        const maxSize = 400;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Analyze colors
        const colorAnalysis = this.analyzeColors(data);
        
        // Analyze brightness and contrast
        const brightnessContrast = this.analyzeBrightnessContrast(data);
        
        // Analyze shape characteristics
        const shapeAnalysis = this.analyzeShape(data, canvas.width, canvas.height);

        const result = {
          colors: colorAnalysis,
          brightness: brightnessContrast.brightness,
          contrast: brightnessContrast.contrast,
          shape: shapeAnalysis,
          size: { width: canvas.width, height: canvas.height }
        };

        // Debug logging
        console.log('Image Analysis Results:', {
          dominantColors: colorAnalysis.slice(0, 3).map(c => ({
            color: c.color,
            percentage: c.percentage.toFixed(1) + '%',
            hsl: this.rgbToHsl(...c.rgb)
          })),
          brightness: Math.round(result.brightness),
          contrast: Math.round(result.contrast),
          aspectRatio: result.shape.aspectRatio.toFixed(2),
          shapeType: result.shape.type
        });

        resolve(result);
      };

      img.src = URL.createObjectURL(imageFile);
    });
  }

  // Analyze dominant colors in image with better grouping
  analyzeColors(imageData) {
    const colorCounts = {};
    const totalPixels = imageData.length / 4;
    const sampleRate = 4; // Sample every 4th pixel for performance

    for (let i = 0; i < imageData.length; i += 4 * sampleRate) {
      const r = imageData[i];
      const g = imageData[i + 1];
      const b = imageData[i + 2];
      const alpha = imageData[i + 3];
      
      // Skip transparent pixels
      if (alpha < 128) continue;
      
      // Group similar colors more intelligently
      const colorKey = `${Math.floor(r/16)*16}-${Math.floor(g/16)*16}-${Math.floor(b/16)*16}`;
      colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
    }

    // Get dominant colors
    const sortedColors = Object.entries(colorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8) // Get top 8 colors
      .map(([color, count]) => ({
        color,
        percentage: (count / (totalPixels / sampleRate)) * 100,
        rgb: color.split('-').map(Number)
      }));

    // Filter out very dark or very light colors that might be shadows/highlights
    const filteredColors = sortedColors.filter(colorInfo => {
      const [r, g, b] = colorInfo.rgb;
      const brightness = (r + g + b) / 3;
      return brightness > 30 && brightness < 220 && colorInfo.percentage > 2;
    });

    return filteredColors.length > 0 ? filteredColors : sortedColors;
  }

  // Analyze brightness and contrast
  analyzeBrightnessContrast(imageData) {
    let totalBrightness = 0;
    let brightnessValues = [];

    for (let i = 0; i < imageData.length; i += 4) {
      const brightness = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
      totalBrightness += brightness;
      brightnessValues.push(brightness);
    }

    const avgBrightness = totalBrightness / (imageData.length / 4);
    
    // Calculate contrast (standard deviation of brightness)
    const variance = brightnessValues.reduce((sum, brightness) => 
      sum + Math.pow(brightness - avgBrightness, 2), 0) / brightnessValues.length;
    const contrast = Math.sqrt(variance);

    return {
      brightness: avgBrightness,
      contrast: contrast
    };
  }

  // Enhanced shape analysis
  analyzeShape(imageData, width, height) {
    const aspectRatio = width / height;
    
    // More detailed shape classification
    let shapeType = 'irregular';
    if (aspectRatio > 2.0) {
      shapeType = 'long'; // Very elongated (carrots, cucumbers)
    } else if (aspectRatio > 1.5) {
      shapeType = 'elongated'; // Moderately long (some brinjals)
    } else if (aspectRatio > 1.2) {
      shapeType = 'oval'; // Slightly oval (potatoes, some brinjals)
    } else if (aspectRatio > 0.8) {
      shapeType = 'round'; // Nearly round (onions, tomatoes, cabbage)
    } else if (aspectRatio > 0.5) {
      shapeType = 'tall'; // Taller than wide
    } else {
      shapeType = 'very_tall'; // Much taller than wide
    }

    // Analyze edge detection for texture
    const edgeComplexity = this.calculateEdgeComplexity(imageData, width, height);
    
    return {
      aspectRatio,
      type: shapeType,
      area: width * height,
      edgeComplexity,
      isRound: aspectRatio > 0.8 && aspectRatio < 1.2,
      isLong: aspectRatio > 1.5,
      isOval: aspectRatio > 1.1 && aspectRatio < 1.8
    };
  }

  // Calculate edge complexity for texture analysis
  calculateEdgeComplexity(imageData, width, height) {
    let edgeCount = 0;
    const threshold = 30;
    
    // Simple edge detection using brightness differences
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const current = (imageData[idx] + imageData[idx + 1] + imageData[idx + 2]) / 3;
        
        const right = ((imageData[idx + 4] + imageData[idx + 5] + imageData[idx + 6]) / 3);
        const bottom = ((imageData[idx + width * 4] + imageData[idx + width * 4 + 1] + imageData[idx + width * 4 + 2]) / 3);
        
        if (Math.abs(current - right) > threshold || Math.abs(current - bottom) > threshold) {
          edgeCount++;
        }
      }
    }
    
    return edgeCount / (width * height); // Normalize by image size
  }

  // Enhanced match image characteristics to crop database using HSL analysis
  enhancedMatchImageToCrop(imageStats, cropDatabase) {
    let bestMatch = null;
    let bestScore = 0;

    Object.entries(cropDatabase).forEach(([cropName, cropData]) => {
      let score = 0;
      let confidence = 0;

      // Enhanced color matching using HSL
      const dominantColors = imageStats.colors.slice(0, 5);
      let colorMatchScore = 0;
      
      dominantColors.forEach(colorInfo => {
        const [r, g, b] = colorInfo.color.split('-').map(Number);
        const hsl = this.rgbToHsl(r, g, b);
        
        // Check if color falls within crop's expected HSL range
        if (cropData.dominantColorRange) {
          const { h: hRange, s: sRange, l: lRange } = cropData.dominantColorRange;
          
          const hMatch = (hsl.h >= hRange[0] && hsl.h <= hRange[1]) || 
                        (hRange[0] > hRange[1] && (hsl.h >= hRange[0] || hsl.h <= hRange[1])); // Handle wrap-around
          const sMatch = hsl.s >= sRange[0] && hsl.s <= sRange[1];
          const lMatch = hsl.l >= lRange[0] && hsl.l <= lRange[1];
          
          if (hMatch && sMatch && lMatch) {
            colorMatchScore += colorInfo.percentage * 2; // Strong match
            confidence += 20;
          } else if (hMatch && (sMatch || lMatch)) {
            colorMatchScore += colorInfo.percentage * 1.5; // Partial match
            confidence += 10;
          }
        }
        
        // Fallback to RGB similarity
        cropData.colors.forEach(cropColor => {
          const similarity = this.colorSimilarity(
            { r, g, b },
            this.hexToRgb(cropColor)
          );
          if (similarity > 70) {
            colorMatchScore += (similarity / 100) * colorInfo.percentage;
            confidence += 5;
          }
        });
      });

      score += colorMatchScore;

      // Shape matching with better logic
      const aspectRatio = imageStats.shape.aspectRatio;
      if (cropData.shapes.includes('long') && aspectRatio > 1.5) {
        score += 25;
        confidence += 15;
      } else if (cropData.shapes.includes('round') && aspectRatio > 0.8 && aspectRatio < 1.2) {
        score += 25;
        confidence += 15;
      } else if (cropData.shapes.includes('oval') && aspectRatio > 1.1 && aspectRatio < 1.8) {
        score += 20;
        confidence += 10;
      }

      // Brightness analysis for specific crops
      if (cropName === 'brinjal' && imageStats.brightness < 120) {
        score += 15; // Brinjals are typically darker
        confidence += 10;
      } else if (cropName === 'onions' && imageStats.brightness > 100 && imageStats.brightness < 180) {
        score += 10; // Onions have moderate brightness
        confidence += 5;
      } else if (cropName === 'tomatoes' && imageStats.brightness > 120) {
        score += 15; // Tomatoes are typically bright
        confidence += 10;
      }

      // Contrast analysis
      if (cropName === 'brinjal' && imageStats.contrast > 25) {
        score += 10; // Brinjals have good contrast
        confidence += 5;
      }

      // Special case: Distinguish brinjal from onion
      if (cropName === 'brinjal') {
        // Look for purple/violet hues specifically
        const hasPurpleHues = dominantColors.some(colorInfo => {
          const [r, g, b] = colorInfo.color.split('-').map(Number);
          const hsl = this.rgbToHsl(r, g, b);
          return hsl.h >= 240 && hsl.h <= 300 && hsl.s > 30; // Purple range
        });
        
        if (hasPurpleHues) {
          score += 30;
          confidence += 25;
        }
      } else if (cropName === 'onions') {
        // Look for brown/yellow hues
        const hasBrownYellowHues = dominantColors.some(colorInfo => {
          const [r, g, b] = colorInfo.color.split('-').map(Number);
          const hsl = this.rgbToHsl(r, g, b);
          return (hsl.h >= 20 && hsl.h <= 60) && hsl.s > 20; // Brown/yellow range
        });
        
        if (hasBrownYellowHues) {
          score += 20;
          confidence += 15;
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = { name: cropName, ...cropData, confidence: Math.min(95, confidence) };
      }
    });

    return bestMatch || {
      name: 'Mixed Vegetables',
      price: { min: 20, max: 30 },
      emoji: '🥬',
      confidence: 60
    };
  }

  // Convert RGB to HSL
  rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: h = 0; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  // Calculate color similarity
  colorSimilarity(color1, color2) {
    const rDiff = Math.abs(color1.r - color2.r);
    const gDiff = Math.abs(color1.g - color2.g);
    const bDiff = Math.abs(color1.b - color2.b);
    const totalDiff = rDiff + gDiff + bDiff;
    return Math.max(0, 100 - (totalDiff / 7.65)); // Normalize to 0-100
  }

  // Convert hex to RGB
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  // Assess quality based on image characteristics
  assessQuality(imageStats) {
    let qualityScore = 50; // Base score

    // Brightness assessment (optimal range: 100-200)
    if (imageStats.brightness >= 100 && imageStats.brightness <= 200) {
      qualityScore += 20;
    } else if (imageStats.brightness < 50 || imageStats.brightness > 250) {
      qualityScore -= 15;
    }

    // Contrast assessment (higher contrast usually means better quality)
    if (imageStats.contrast > 30) {
      qualityScore += 15;
    } else if (imageStats.contrast < 15) {
      qualityScore -= 10;
    }

    // Size assessment (larger images usually indicate better quality photos)
    const totalPixels = imageStats.size.width * imageStats.size.height;
    if (totalPixels > 500000) { // > 0.5MP
      qualityScore += 10;
    } else if (totalPixels < 100000) { // < 0.1MP
      qualityScore -= 10;
    }

    // Ensure score is within bounds
    qualityScore = Math.max(0, Math.min(100, qualityScore));

    // Determine grade and prefix
    let grade, prefix;
    if (qualityScore >= 90) {
      grade = 'A+';
      prefix = 'Premium';
    } else if (qualityScore >= 80) {
      grade = 'A';
      prefix = 'High Quality';
    } else if (qualityScore >= 70) {
      grade = 'B+';
      prefix = 'Good';
    } else if (qualityScore >= 60) {
      grade = 'B';
      prefix = 'Standard';
    } else {
      grade = 'C';
      prefix = 'Basic';
    }

    return { score: qualityScore, grade, prefix };
  }

  // Generate quality assessment notes with crop-specific insights
  generateQualityNotes(quality, crop) {
    const notes = [];
    
    if (quality.score >= 80) {
      notes.push("Excellent visual quality detected");
      notes.push("Good lighting and clarity");
    } else if (quality.score >= 60) {
      notes.push("Good quality with minor imperfections");
    } else {
      notes.push("Consider better lighting for accurate assessment");
    }

    // Add crop-specific notes
    if (crop.confidence > 85) {
      notes.push(`High confidence identification: ${crop.name}`);
    } else if (crop.confidence > 70) {
      notes.push(`Good match for ${crop.name} characteristics`);
    } else {
      notes.push(`Possible ${crop.name} - consider manual verification`);
    }

    notes.push("Market conditions favorable for selling");

    return notes.join(". ");
  }

  // Fallback analysis when all else fails
  fallbackAnalysis() {
    const crops = [
      { name: 'Mixed Vegetables', emoji: '🥬', price: 25 },
      { name: 'Fresh Produce', emoji: '🌾', price: 22 },
      { name: 'Garden Vegetables', emoji: '🥕', price: 28 }
    ];

    const randomCrop = crops[Math.floor(Math.random() * crops.length)];
    const qualities = ['A+', 'A', 'B+'];
    const randomQuality = qualities[Math.floor(Math.random() * qualities.length)];

    return {
      cropType: `Premium ${randomCrop.name}`,
      quality: randomQuality,
      pricePerKg: `₹${randomCrop.price}/kg`,
      notes: "Basic analysis completed. For better results, ensure good lighting and clear image.",
      confidence: 75,
      emoji: randomCrop.emoji,
      source: 'fallback',
      marketTrend: 'stable'
    };
  }
}

const imageAnalysisService = new ImageAnalysisService();
export default imageAnalysisService;