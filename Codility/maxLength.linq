<Query Kind="Program" />

void Main()
{
	new Solution().solution("0A0aaa").Dump();
}


class Solution
{
	public int solution(string S)
	{
		int maxLength = -1;
		int currentLength = 0;
		bool hasUppercaseLetter = false;
		
		for (int i = 0; i < S.Length; i++)
		{
			if (char.IsNumber(S[i]))
			{
				if (hasUppercaseLetter && maxLength < currentLength)
				{
					maxLength = currentLength;
				}

				hasUppercaseLetter = false;
				currentLength = 0;
			}
			else if (char.IsLetter(S[i]))
			{
				currentLength++;
				if (char.IsUpper(S[i]))
				{
					hasUppercaseLetter = true;
				}
			}			
		}

		if (hasUppercaseLetter && maxLength < currentLength)
		{
			maxLength = currentLength;
		}

		return maxLength;
	}
	
	
}
