# Finite field visualisation tool

This tool uses math.js to evaluate its input expressions, so its input can get rather complicated, as long as you follow the current math.js function list. http://mathjs.org/docs/reference/functions.html

<h2>General Guidelines of Use</h2>

<p><b>Be wary of really big numbers.</b> A function of x^y + y^x will create a value so large that it won't be represented correctly on the output display. The max integer value that can be calculated is 9007199254740992 - roughly 10 to the power of 15. If you want to investigate powers, consider dividing the exponent by a constant or the size of the domain. 
For example <code>y^((x*4)/domain)</code>. As an addendum, also consider that your output range of values could be too small -  the domain for this particular tool is integer only, so if you perform calculations that result in a range that is smaller than one, the only thing you are going to see is a plain color. To amplify your pattern, multiply it by "d", your domain size, once or several times.</p>

<p><b>Watch out for the negatives.</b> If the display is partially blank when coloring by modulus, or it seems that colors have run down your screen when coloring by most Sig. digit, chances are you have created negative values in your range. This can easily be fixed by adding <code>abs()</code> around your function. With value to hue coloring you should never have this problem, as it accepts negative input, and colors it the inverse of the absolute color value.</p>

<p><b>Applied and Threshold modulus.</b> The applied modulus is the modulus value that is applied to every output of the function, if this value is greater than the threshold modulus the display cell is colored red. You can use the variables <code>x, y, d, pi, e</code> as well as all other functions such as trig in this input. 
A larger applied modulus and modulus threshold will generally "zoom in" on the equation, whereas a smaller modulus will zoom out. For best results, keep the modulus threshold half of the applied modulus.</p>

<p><b>Translations and Transformations. </b>To transform a range coloring, we have to change our input function. You can do this by placing brackets around the x and y values, then subtracting, adding, multiplying or dividing them to get the intended result. For example, <code>x*y</code> becomes <code>(x-d/2)*(y-d/2)</code> to shift it half the way over the screen, down and to the left. 
You will notice that the negatives in this result function cause white space in the modulus output, so for aesthetic purposes the final function input might look like this - <code>abs((x-d/2)*(y-d/2))</code></p>

<p><b>Basics of trigonometry.</b> The function input accepts operators such as <code>sin(x) cos(x) tan(x)</code>, however you must be careful with what input you give them. A good starting point is <code>sin(x/d*pi)*sin(y/d*pi)*d*d</code>, where we divide our x and y values by the domain size then multiply by pi to scale the output so that it fits perfectly in the range display. 
If the input to the trigonomic function was <code>x*k/d*pi</code> the pattern would be repeated k squared times within the output. If you are familiar with transformations of graphs, you should notice some familiar rules here.</p>

<p><b>Other useful functions and symbols.</b> <code>x % 20</code> performs modulus twenty on x. <code>x!</code> is generally a bad idea, but as you would expect performs factorial on x. Logarithms follow the format <code>log(x,base) or log10(x)</code>, to calculate the square root <code>sqrt(x)</code> and the cube root <code>cbrt(x)</code>. 
A full list of the functions can be found <a href="http://mathjs.org/docs/reference/functions.html">here.</a> You can create some crazy stuff with this, as mathjs, the library that powers this tool has a range of logical and statistical functions. Some of my favourites include <code>gcd(x, y) and lcm(x,y)</code> which represent greatest common denomiator and least common multiplier of x y respectively.</p>

<p><b>Working with conditional expressions.</b> What if you want to color the range of multiple functions? Use the convention <code>condition ? true : false</code> which should look something like this <code>x % d >= d/2 ? x*y : x*x+y*y</code>. This also works with the function <code>isPrime(x)</code> as the condition.</p>

<p><b>Fullscreen and Trackbar input.</b> To fully admire your result, I adivse pressing the F11 key so that the entire canvas can be viewed on screen without scrolling. If this doesn't suite your display size, try zooming in and out of your browser window by using ctrl +- or ctrl and the scroll wheel. Regarding the trackbar input, once selected this can be changed one at a time using arrow keys, if this change is too small you can also hover over it with your mouse and use the scroll wheel. </p>

<p><b>What about r, tx and ty?</b> These are some useful custom variables I've included as shorthand. They are defined in the script as follows:</p>
 
  <code>var pythag = math.compile("sqrt(y *times* y+x *times* x)"); //r, representing radius, or distance from center</code><p></p>
  <code>var trigY = math.compile("(2 *times* d *times* atan(abs(y/x)))/pi"); //ty, representing angle offset</code><p></p>
  <code>var trigX = math.compile("(2 *times* d *times* atan(abs(x/y)))/pi"); //tx, representing angle offset</code><p></p>
<p>I've previously had some luck with imaginary numbers and animations of these fields over time, although this was several years ago. You can see my results on a YouTube playlist, https://www.youtube.com/watch?v=yKvyjbIAQCE&list=PLU4oD5zYczKpqQaXiv3VMjS9umrRXi2nn</p>
