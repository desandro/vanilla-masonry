(function( window, undefined ) {

  var getStyle = document.defaultView && document.defaultView.getComputedStyle ?
    function( elem ) {
      return document.defaultView.getComputedStyle( elem, null )
    } : 
    function( elem ) {
      return elem.currentStyle;
    };

  // -------------------------- getWH -------------------------- //

  // returns width/height of element, refactored getWH from jQuery
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

  window.getWH = getWH;

  // -------------------------- addEvent / removeEvent -------------------------- //

  // by John Resig - http://ejohn.org/projects/flexible-javascript-events/

  function addEvent( obj, type, fn ) {
    if ( obj.addEventListener )
      obj.addEventListener( type, fn, false );
    else if ( obj.attachEvent ) {
      obj[ 'e' + type + fn ] = fn;
      obj[ type + fn ] = function() { 
        obj[ 'e' + type + fn ]( window.event ); 
      }
      obj.attachEvent( "on" + type, obj[ type + fn ] );
    }
  }

  function removeEvent( obj, type, fn ) {
    if ( obj.removeEventListener )
      obj.removeEventListener( type, fn, false );
    else if ( obj.detachEvent ) {
      obj.detachEvent( "on" + type, obj[ type + fn ] );
      obj[ type + fn ] = null;
      obj[ 'e' + type + fn ] = null;
    }
  }

  window.addEvent = addEvent;
  window.removeEvent = removeEvent;

  // -------------------------- debounce -------------------------- //

  // by John Hann - http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/

  function debounce( func, threshold, execAsap ) {
    var timeout;

    return function debounced() {
      var obj = this, args = arguments;
      function delayed () {
        if ( !execAsap ) {
          func.apply( obj, args );
        }
        timeout = null;
      };

      if ( timeout ) {
        clearTimeout( timeout );
      } else if ( execAsap ) {
        func.apply( obj, args );
      }

      timeout = setTimeout(delayed, threshold || 100);
    };

  }

  window.debounce = debounce;

})( window );
