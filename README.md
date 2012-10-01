Event emulation JavaScript library.
===================

###Usage
Just include library into your page.

<pre><code>&lt;script src="path/to/eemul.js" type="text/javascript">&lt;/script>
</code></pre>

###Usage
#####eemul.click(Mixed: selector)
Emulate click event.
 * selector - A selector, element or jQuery object for which will be trigger the event

#####eemul.dragTo(Mixed: selector, Number: dX, Number: dY, Number: time, Number: steps)
Emulate dragging to specified point.
 * selector - A selector, element or jQuery object for which will be trigger the event
 * dX       - Increment of the X coordinate
 * dY       - Increment of the Y coordinate
 * time     - The duration of the animation
 * steps    - The number of the animation steps

#####eemul.dragToObject(Mixed: elemSelector, Mixed: objSelector, Number: time, Number: steps)
Emulate dragging to specified element.
 * elemSelector - A selector, element or jQuery object for which will be trigger the event
 * objSelector  - A selector, element or jQuery object. Tagret element
 * time         - The duration of the animation
 * steps        - The number of the animation steps

#####eemul.focus(Mixed: selector)
Emulate focus event.
 * selector - A selector, element or jQuery object for which will be trigger the event

#####eemul.blur(Mixed: selector)
Emulate blur event.
 * selector - A selector, element or jQuery object for which will be trigger the event

#####eemul.keydown(Mixed: selector, Number: keyCode)
Emulate keydown event.
 * selector - A selector, element or jQuery object for which will be trigger the event
 * keyCode  - Keycode

#####eemul.keypress(Mixed: selector, Number: keyCode)
Emulate keypress event.
 * selector - A selector, element or jQuery object for which will be trigger the event
 * keyCode  - Keycode

#####eemul.keyup(Mixed: selector, Number: keyCode)
Emulate keyup event.
 * selector - A selector, element or jQuery object for which will be trigger the event
 * keyCode  - Keycode

#####eemul.fill(Mixed: selector, String: str, Number: time)
Fill an text input
 * selector - A selector, element or jQuery object for which will be trigger the event
 * str      - The text to fill 
 * time     - The duration of the animation

#####eemul.check(Mixed: selector)
Set the checkbox to the selected state.
 * selector - A selector, element or jQuery object for which will be trigger the event

#####eemul.uncheck(Mixed: selector)
Set the checkbox to the unselected state.
 * selector - A selector, element or jQuery object for which will be trigger the event

#####eemul.setSelect(Mixed: selector, Mixed: value)
Set the select to the given value.
 * selector - A selector, element or jQuery object for which will be trigger the event
 * value    - A desired value

#####eemul.setRadio(String: name, Mixed: value)
Set the radio to the given value.
 * name  - The attribute "name" of the radio element
 * value - A desired value

#####eemul.keys
Keycodes map

###Browsers compatibility
This code tested only with Firefox and Google Chrome.

#### [Demo](http://4031651.github.com/eemul/)