<Query Kind="Program" />

void Main()
{
	new Solution().solution(
		new int[] { 40, 40, 100, 80, 20},
		new int[] { 3, 3, 2, 2, 3},
		3, 5, 200).Dump();
	new Solution().solution(
		new int[] { 60, 80, 40, },
		new int[] { 2, 3, 5, },
		5, 2, 200).Dump();
	new Solution().solution(
		new int[] { 1, 2, 3, 4, },
		new int[] { 1, 1, 1, 1, },
		1, 1, 4).Dump();
}

class Solution
{
	public int solution(int[] A, int[] B, int M, int X, int Y)
	{
		int totalLifts = 0;
		var floorsByCount = new Dictionary<int, int>();
		int i = 0;

		while (i < A.Length)
		{
			int totalWeight = 0;
			int totalPeople = 0;
			int j = i;
			var visitedFloors = new HashSet<int>();
			
			while (j < A.Length && totalWeight <= Y - A[j] && totalPeople < X)
			{
				visitedFloors.Add(B[j]);
				totalWeight += A[j];
				totalPeople++;
				j++;
			}

			foreach (var visitedFloor in visitedFloors)
			{
				if (floorsByCount.ContainsKey(visitedFloor))
				{
					floorsByCount[visitedFloor] += 1;
				}
				else
				{
					floorsByCount[visitedFloor] = 1;
				}
			}
		
			totalLifts++;
			i += j;
		}

		int stopsCount = 0;
		foreach (var floorVisitedCount in floorsByCount.Values)
		{
			stopsCount += floorVisitedCount;
		}
		
		return stopsCount + totalLifts;
	}
}
