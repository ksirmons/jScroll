// ####################################################################################
// #######                                                                      #######
// #######           Plugin:      jScroll                                       #######
// #######    Update Author:      Keith Sirmons                                 #######
// #######  Original Author:      William Duffy                                 #######
// ####### Original Website:      http://www.wduffy.co.uk/jScroll               #######
// ####### Version:     1.2	                                                    #######
// #######                                                                      #######
// ####### Copyright (c) 2011, William Duffy - www.wduffy.co.uk                 #######
// #######                                                                      #######
// ####### Permission is hereby granted, free of charge, to any person          #######
// ####### obtaining a copy of this software and associated documentation       #######
// ####### files (the "Software"), to deal in the Software without              #######
// ####### restriction, including without limitation the rights to use,         #######
// ####### copy, modify, merge, publish, distribute, sublicense, and/or sell    #######
// ####### copies of the Software, and to permit persons to whom the            #######
// ####### Software is furnished to do so, subject to the following             #######
// ####### conditions:                                                          #######
// #######                                                                      #######
// ####### The above copyright notice and this permission notice shall be       #######
// ####### included in all copies or substantial portions of the Software.      #######
// #######                                                                      #######
// ####### THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,      #######
// ####### EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES      #######
// ####### OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND             #######
// ####### NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT          #######
// ####### HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,         #######
// ####### WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING         #######
// ####### FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR        #######
// ####### OTHER DEALINGS IN THE SOFTWARE.                                      #######
// #######                                                                      #######
// ####################################################################################
(function ($) {

    // Public: jScroll Plugin
    $.fn.jScroll = function (options) {

        var opts = $.extend({}, $.fn.jScroll.defaults, options);

        return this.each(function () {
            var $elementToStayVisible = $(this);
            var $contentContainer = $(this).parent();
            var $scrollWindow = $contentContainer.parent();
            var locator = new location($elementToStayVisible);
			
            $scrollWindow.on("scroll", function () {                
                $elementToStayVisible
					.stop()
					.animate(locator.getMargin($scrollWindow), opts.speed);
            });
        });

        // Private to the individual scrollElement
        function location($elementToStayVisible) {
      
            this.originalMargin = parseInt($elementToStayVisible.css("margin-top"), 10) || 0;
			this.originalBottomMargin = parseInt($elementToStayVisible.css("margin-bottom"), 10) || 0;
			
			console.debug($elementToStayVisible.attr("id") + " margin - " + this.originalMargin );
            
			this.getMargin = function ($scrollWindow) {
                var elementOffsetFromScrollWindowTop = $elementToStayVisible.parent().offset().top - $scrollWindow.offset().top + $scrollWindow.scrollTop();
                var maxMargin = $elementToStayVisible.parent().height() - ( $elementToStayVisible.outerHeight() + this.originalBottomMargin );  					
				
				if (maxMargin < 0){
					maxMargin = 0;
				}
				var margin = this.originalMargin;

                if ($scrollWindow.scrollTop() > elementOffsetFromScrollWindowTop ) {
                    var tmp = opts.top + $scrollWindow.scrollTop() - elementOffsetFromScrollWindowTop;
					if (tmp > margin)
					{
						margin = tmp;
					}
				}

                if (margin > maxMargin) {
                    margin = maxMargin;
				}
				
                return ({ "marginTop": margin + 'px' });
            }
        }
    };

    // Public: Default values
    $.fn.jScroll.defaults = {
        speed: "slow",
        top: 10
    };

})(jQuery);