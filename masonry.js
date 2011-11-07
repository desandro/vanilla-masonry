(function( window, undefined ) {

  var getStyle = document.defaultView && document.defaultView.getComputedStyle ?
    function( elem ) {
      return document.defaultView.getComputedStyle( elem, null )
    } : 
    function( elem ) {
      return elem.currentStyle;
    };

  // refactored getWH from jQuery
  function getWH( elem, measure, isOuter ) {
    // Start with offset property
    var isWidth = measure === 'width',
        val = isWidth ? elem.offsetWidth : elem.offsetHeight,
        dirA = isWidth ? 'Left' : 'Top',
        dirB = isWidth ? 'Right' : 'Bottom',
        computedStyle = getStyle( elem ),
        paddingA = parseFloat( computedStyle[ 'padding' + dirA ] ) || 0,
        paddingB = parseFloat( computedStyle[ 'padding' + dirB ] ) || 0,
        marginA = parseFloat( computedStyle[ 'margin' + dirA ] ) || 0,
        marginB = parseFloat( computedStyle[ 'margin' + dirB ] ) || 0,
        borderA = parseFloat( computedStyle[ 'border' + dirA + 'Width' ] ) || 0,
        borderB = parseFloat( computedStyle[ 'border' + dirB + 'Width' ] ) || 0;

    if ( val > 0 ) {

      if ( isOuter ) {
        // outerWidth, outerHeight, add margin
        val += marginA + marginB;
      } else {
        // like getting width() or height(), no padding or border
        val -= paddingA + paddingB + borderA + borderB;
      }

    } else {

      // Fall back to computed then uncomputed css if necessary
      val = computedStyle[ measure ];
      if ( val < 0 || val == null ) {
        val = elem.style[ measure ] || 0;
      }
      // Normalize "", auto, and prepare for extra
      val = parseFloat( val ) || 0;

      if ( isOuter ) {
        // Add padding, border, margin
        val += paddingA + paddingB + marginA + marginB + borderA + borderB;
      }
    }

    return val;
  }

  }

  window.getWH = getWH;

})( window );
