/**
 * Processing brush for SyntaxHighlighter, updated for version 3.0
 *
 * SyntaxHighlighter is at http://alexgorbatchev.com/SyntaxHighlighter
 *
 * @copyright
 * Copyright 2011 Colin Mitchell colin@muffinlabs.com
 *
 * @license
 * Licensed under The Do What The Fuck You Want To Public License (WTFPL)
 * http://sam.zoy.org/wtfpl/
 * Dual licensed under the MIT and GPL licenses.
 */
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush()
	{
		var literals2 = 'ADD ALIGN_CENTER ALIGN_LEFT ALIGN_RIGHT ALPHA ALPHA_MASK ALT AMBIENT ARC ARROW ARGB BACKSPACE BASELINE BEVEL BLEND BLUE_MASK BLUR BOX CENTER CHORD CLICK CMYK COMPLAINT COMPONENT CONTROL CORNER CROSS DARKEST DEGREES DEG_TO_RAD DELETE DIAMETER DIFFERENCE DIFFUSE DILATE DIRECTIONAL DISABLE_ACCURATE_2D DISABLE_DEPTH_MASK DISABLE_DEPTH_SORT DISABLE_DEPTH_TEST DISABLE_NATIVE_FONTS DISABLE_OPENGL_ERRORS DISABLE_PURE_STROKE DISABLE_TEXTURE_MIPMAPS DISABLE_TRANSFORM_CACHE DISABLE_STROKE_PERSPECTIVE DISABLED DODGE DOWN DRAG DXF ELLIPSE ENABLE_ACCURATE_2D ENABLE_DEPTH_MASK ENABLE_DEPTH_SORT ENABLE_DEPTH_TEST ENABLE_NATIVE_FONTS ENABLE_OPENGL_ERRORS ENABLE_PURE_STROKE ENABLE_TEXTURE_MIPMAPS ENABLE_TRANSFORM_CACHE ENABLE_STROKE_PERSPECTIVE ENTER EPSILON ERODE ESC EXCLUSION EXIT GIF GRAY GREEN_MASK GROUP HALF HALF_PI HAND HARD_LIGHT HINT_COUNT HSB IMAGE INVERT JPEG LEFT LIGHTEST LINE LINES LINUX MACOSX MAX_FLOAT MAX_INT MIN_FLOAT MIN_INT MITER MODEL MOVE MULTIPLY NORMAL NORMALIZED NO_DEPTH_TEST NTSC ONE OPAQUE OPEN ORTHOGRAPHIC OVERLAY PAL PDF P2D P3D PERSPECTIVE PI PIE PIXEL_CENTER POINT POINTS POSTERIZE PRESS PROBLEM PROJECT QUAD QUAD_STRIP QUADS QUARTER_PI RAD_TO_DEG RADIUS RADIANS RECT RED_MASK RELEASE REPEAT REPLACE RETURN RGB RIGHT ROUND SCREEN SECAM SHAPE SHIFT SPECULAR SPHERE SOFT_LIGHT SQUARE SUBTRACT SVIDEO TAB TARGA TAU TEXT TFF THIRD_PI THRESHOLD TIFF TOP TRIANGLE TRIANGLE_FAN TRIANGLES TRIANGLE_STRIP TUNER TWO TWO_PI UP WAIT WHITESPACE';
		
		var functions1 = 'abs acos addChild alpha ambient ambientLight append applyMatrix arc arrayCopy ArrayList asin atan atan2 background beginCamera beginContour beginRaw beginRecord beginShape bezier bezierDetail bezierPoint bezierTangent bezierVertex binary blend blendColor blendMode blue boolean box breakShape brightness byte camera ceil char clear clip color colorMode concat constrain copy cos createFont createGraphics createImage createInput createOutput createPath createReader createShape createWriter cursor curve curveDetail curvePoint curveTangent curveTightness curveVertex day degrees directionalLight dist ellipse ellipseMode emissive end endCamera endContour endRaw endRecord endShape exit exp expand fill filter float floor frameRate frustum get green HashMap hex hint hour hue image imageMode int join lerp lerpColor lightFalloff lights lightSpecular line list loadBytes loadFont loadImage loadJSONArray loadJSONObject loadMatrix loadPixels loadShader loadShape loadStrings loadTable loadXML log loop mag map match matchAll max millis min minute modelX modelY modelZ month mouseReleased nf nfc nfp nfs noClip noCursor noFill noise noiseDetail noiseSeed noLights noLoop norm normal noSmooth noStroke noTint open ortho parseBoolean parseByte parseChar parseFloat parseInt parseXML perspective point pointLight popMatrix popStyle pow print printCamera println printMatrix printProjection pushMatrix pushStyle PVector quad quadraticVertex radians random randomGaussian randomSeed rect rectMode red redraw requestImage resetMatrix resetShader reverse rotate rotateX rotateY rotateZ round saturation save saveBytes saveFile saveFrame saveJSONArray saveJSONObject savePath saveStream saveStrings saveXML scale screenX screenY screenZ second selectFolder selectInput selectOutput set shader shape shapeMode shearX shearY shininess shorten sin size sketchFile sketchPath smooth sort specular sphere sphereDetail splice split splitTokens spotLight sq sqrt start stop str stroke strokeCap strokeJoin strokeWeight subset tan text textAlign textAscent textDescent textFont textLeading textMode textSize texture textureMode textureWrap textWidth tint translate triangle trim unbinary unhex updatePixels vertex year';
		var functions2 = 'add addChild addColumn addRow angleBetween append array beginContour beginDraw blend cache charAt clear clearRows close copy cross disableStyle dist div dot enableStyle endContour endDraw endShape equals filter findRow findRows flush format fromAngle get getAttributeCount getBoolean getChild getChildCount getChildren getColumnCount getContent getFloat getInt getIntArray getJSONArray getJSONObject getName getParent getRow getRowCount getString getStringArray getStringColumn getVertex getVertexCount hasAttribute hasChildren hasKey hasValue heading increment indexOf isVisible keyArray keys length lerp limit listAttributes listChildren loadPixels lower mag magSq mask matchRow matchRows max min mult normalize print println PShader random2D random3D readLine remove removeChild removeColumn removeRow removeTokens resetMatrix resize reverse rotate rotateX rotateY rotateZ rows save scale set setBoolean setContent setFloat setInt setJSONArray setJSONObject setMag setName setString setVertex setVisible shuffle size sort sortKeys sortKeysReverse sortReverse sortValues sortValuesReverse sub substring toLowerCase toString toUpperCase translate trim updatePixels upper valueArray values';
		var functions3 = 'catch do for if switch synchronized while';
		var functions4 = 'draw keyPressed keyReleased keyTyped mouseClicked mouseDragged mouseMoved mousePressed mouseWheel setup';

		var keywords1 = 'abstract assert break case class continue default enum extends false final finally implements import instanceof interface native new null package private protected public return static strictfp super this throw throws transient true void volatile';
		var keywords2 = 'length pixels';
		var keywords3 = 'catch do else for if switch synchronized try while';
		var keywords4 = 'displayHeight displayWidth focused frameCount frameRate height key keyCode keyPressed mouseButton mousePressed mouseX mouseY pixels pmouseX pmouseY width';
		var keywords5 = 'Array ArrayList Boolean boolean BufferedReader Byte byte char Character Class color Double double Float float FloatDict FloatList HashMap int IntDict Integer IntList JSONArray JSONObject long PFont PGraphics PImage PrintWriter PShader PShape PVector short String StringBuffer StringDict StringList Table TableRow Thread XML';

		this.regexList = [
			{ regex: SyntaxHighlighter.regexLib.singleLineCComments,	css: 'comments' },		// one line comments
			{ regex: /\/\*([^\*][\s\S]*)?\*\//gm,						css: 'comments' },	 	// multiline comments
			{ regex: /\/\*(?!\*\/)\*[\s\S]*?\*\//gm,					css: 'preprocessor' },	// documentation comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },		// strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },		// strings
			{ regex: /\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,				css: 'value' },			// numbers
			{ regex: /(?!\@interface\b)\@[\$\w]+\b/g,					css: 'color1' },		// annotation @anno
			{ regex: /\@interface\b/g,									css: 'color2' },		// @interface keyword

			{ regex: new RegExp(this.getKeywords(keywords1+' '+keywords2), 'gm'), css: 'keyword1' },
			{ regex: new RegExp(this.getKeywords(keywords3), 'gm'), css: 'keyword2' },
			{ regex: new RegExp(this.getKeywords(keywords4), 'gm'), css: 'keyword3' },
			{ regex: new RegExp(this.getKeywords(keywords5), 'gm'), css: 'keyword4' },

			{ regex: new RegExp(this.getKeywords(literals2), 'gm'), css: 'literal2' },

			{ regex: new RegExp(this.getKeywords(functions1+' '+functions2), 'gm'),	css: 'function2' },
			{ regex: new RegExp(this.getKeywords(functions3), 'gm'),	css: 'function1' },
			{ regex: new RegExp(this.getKeywords(functions4), 'gm'),	css: 'function2 bold' }
		];

		this.forHtmlScript({
			left	: /(&lt;|<)%[@!=]?/g, 
			right	: /%(&gt;|>)/g 
		});

		this.forHtmlScript(SyntaxHighlighter.regexLib.aspScriptTags);
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['processing', 'pjs', 'pde'];

	SyntaxHighlighter.brushes.Processing = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
