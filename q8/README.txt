HOWTO:

for this drawing panel, here are the algorithms.

1) I use the canvas to do all the operations.

2) first get all the current state and keep track of them, since it contains the color selection, shape of the brushes.

3) for the detailed process, please refer to code. add the listener for moving and clicking, so that when moving I used the erase or drawing function according to our state(brush or eraser), when clicking then start doing the operation like drawing or others with the state.

4) clip board for color is using system inherited.