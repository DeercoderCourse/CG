HOWTO:


I will give a short description of how to do it using three.js, here due to limited time, I still cannot make it drawing, but I write the complete process of what I should do in the code:


1) first, set the parameters, which include layer_number, thickness and shrink, these has been tested OK and shown in the log.

2) second given a four vertices array, we should form the other four vertices, which lays in the bottom side, then by all these eight points, I can draw the plane/
	* using the z height(=thickness) to generate the bottom vertice(OK).
	* draw the plane with the eight points (process OK).

3) third, the above process just draws the first-lay 3D-object, now the next lay depends on the shrink and bottom coordinates, so using the bottom coordinates in the above steps with the shrink factors, we could generate the new inputVertice.

4) After get the inputVertice, by 2) I could draw the new 3D-object

5) using that iteratively, using the loop controlled by the lay_num, draw all the 3D-objects.


** All the process could be seen in the code, except some three.js problem of showing.  


