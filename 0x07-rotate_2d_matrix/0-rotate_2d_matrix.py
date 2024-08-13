#!/usr/bin/python3
"""2D matrix rotation module.
"""


def rotate_2d_matrix(matrix):
    """Rotates an n by n 2D matrix 90 degrees clockwise in place.
    
    Args:
        matrix (list of list of int): The matrix to rotate.
        
    Returns:
        None: The matrix is modified in place.
    """
    if type(matrix) != list:
        return
    if len(matrix) <= 0:
        return
    if not all(map(lambda x: type(x) == list, matrix)):
        return
    rows = len(matrix)
    cols = len(matrix[0])
    if not all(map(lambda x: len(x) == cols, matrix)):
        return

    # Transpose and reverse the rows to rotate the matrix
    for i in range(rows):
        for j in range(i, cols):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for i in range(rows):
        matrix[i].reverse()

    # Print the rotated matrix row by row
    for row in matrix:
        print(row)
