"""
TESTS is a dict with all of your tests.
Keys for this will be the categories' names.
Each test is a dict with
    "input" -- input data for a user function
    "answer" -- your right answer
    "explanation" -- not necessarily a key, it's used for an additional info in animation.
"""


TESTS = {
    "Basics": [
        {
            "input": [(7, 122), (8, 139), (9, 156), (10, 173), (11, 190), (-100, 1)],
            "answer": 1.13
        },
        {
            "input": [(5, 50), (6, 60), (1, 23)],
            "answer": 0
        }
    ],
    "Extra": [
        {
            "input": [(1, 4), (3, 10), (100, 301), (10, 31), (411, 22), (-50, -14)],
            "answer": 0.32
        },
        {
            "input": [(2, 20), (3, 25), (10, 60), (20, 110), (1, -17), (540, -11)],
            "answer": 1.96
        },
        {
            "input": [(10, 10), (13, 13), (21, 18)],
            "answer": 0
        },
        {
            "input": [(5, 28), (7, 38), (2, 13), (10, 53), (1, 22)],
            "answer": 0.59
        },
        {
            "input": [(1, -4), (4, 5), (7, 14), (10, 110)],
            "answer": 2.21
        },
        {
            "input": [(3, 10), (1, 3), (6, 20.5), (5, 44.33)],
            "answer": 0.14
        },
        {
            "input": [(6, -0.5), (3, -5), (1, -20)],
            "answer": 5.27
        },
        {
            "input": [(3, -0.5), (7, 3.5), (13, 9.5), (20, 100)],
            "answer": 2.47
        }

    ]
}
