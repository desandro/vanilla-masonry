(function( window, undefined ) {
  
  var getStyle = document.defaultView && document.defaultView.getComputedStyle ?
    function getStyle( elem ) {
      return document.defaultView.getComputedStyle( elem, null )
    } : 
    function getStyle( elem ) {
      return elem.currentStyle;
    };
    
  function getOuterWidth( elem ) {
    // Start with offset property
    var val = elem.offsetWidth,
        computedStyle = getStyle( elem );

    if ( val <= 0 ) {
      // Fall back to computed then uncomputed css if necessary
      val = computedStyle.width;
      if ( val < 0 || val == null ) {
        val = elem.style.width || 0;
      }
      // Normalize "", auto, and prepare for extra
      val = parseFloat( val ) || 0;

      // Add padding, border, margin
      val += parseFloat( computedStyle.paddingLeft ) || 0;
      val += parseFloat( computedStyle.paddingRight ) || 0;
      val += parseFloat( computedStyle.borderLeftWidth ) || 0;
      val += parseFloat( computedStyle.borderRightWidth ) || 0;
    }

    val += parseFloat( computedStyle.marginLeft ) || 0;
    val += parseFloat( computedStyle.marginRight ) || 0;

    return val;
  }
  
  function getWH( elem, name, extra ) {

  	// Start with offset property
  	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
  		which = name === "width" ? cssWidth : cssHeight;

  	if ( val > 0 ) {
  		if ( extra !== "border" ) {
  			jQuery.each( which, function() {
  				if ( !extra ) {
  					val -= parseFloat( jQuery.css( elem, "padding" + this ) ) || 0;
  				}
  				if ( extra === "margin" ) {
  					val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;
  				} else {
  					val -= parseFloat( jQuery.css( elem, "border" + this + "Width" ) ) || 0;
  				}
  			});
  		}

  		return val + "px";
  	}

  	// Fall back to computed then uncomputed css if necessary
  	val = curCSS( elem, name, name );
  	if ( val < 0 || val == null ) {
  		val = elem.style[ name ] || 0;
  	}
  	// Normalize "", auto, and prepare for extra
  	val = parseFloat( val ) || 0;

  	// Add padding, border, margin
  	if ( extra ) {
  		jQuery.each( which, function() {
  			val += parseFloat( jQuery.css( elem, "padding" + this ) ) || 0;
  			if ( extra !== "padding" ) {
  				val += parseFloat( jQuery.css( elem, "border" + this + "Width" ) ) || 0;
  			}
  			if ( extra === "margin" ) {
  				val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;
  			}
  		});
  	}

  	return val + "px";
  }

  window.getWH = getWH;
  window.getOuterWidth = getOuterWidth;

})( window );
