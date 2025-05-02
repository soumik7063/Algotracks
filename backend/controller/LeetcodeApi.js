export const leetCodeContest = async (req,res)=>{
    try {
        const leetcodeResponse = await fetch('https://leetcode.com/graphql',{
                    method:'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(req.body),
                })
        
                const data = await leetcodeResponse.json();
                res.json(data)
    } catch (error) {
        console.error('Error fetching from LeetCode:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}