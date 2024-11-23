#!/usr/bin/python3
"""
Module for matrix rotation
This module provides a function to rotate an n x n 2D matrix 90 degrees clockwise
"""


def rotate_2d_matrix(matrix):
    """
    Rotates a 2D matrix 90 degrees clockwise in-place
    Args:
        matrix: n x n 2D matrix to rotate
    Returns:
        None (matrix is edited in-place)
    """
    n = len(matrix)

    # Step 1: Transpose the matrix
    # (Switch elements across the main diagonal)
    for i in range(n):
        for j in range(i, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # Step 2: Reverse each row
    # (Mirror elements horizontally)
    for i in range(n):
        matrix[i].reverse()

