// Extended lesson interface with content field
export interface LessonWithContent {
  id: string;
  title: string;
  description: string;
  content: string;
  questions: any[];
  totalPoints: number;
}

// Content additions for RESP lessons
export const respLessonContent = {
  'resp-1': `An RESP (Registered Education Savings Plan) is Canada's gift to students—a special savings account designed specifically for post-secondary education.

**What Makes RESPs Special?**
1. **Government Grants** - Free money added to your savings!
2. **Tax-Free Growth** - Investments grow without tax
3. **Flexible Use** - University, college, trade school, apprenticeships
4. **Family Friendly** - Parents, grandparents, anyone can contribute

**The Canadian Education Savings Grant (CESG):**
The government adds 20% to contributions:
• Contribute $100 → Government adds $20
• Contribute $2,500/year → Government adds $500
• Maximum lifetime grant: $7,200

**Who Can Open an RESP?**
• Parents for their children
• Grandparents for grandchildren
• Anyone for a beneficiary (even yourself!)

**No Contribution Limits:**
You can contribute as much as you want, but only the first $2,500 per year gets the 20% grant.

**The Bottom Line:**
RESPs turn your family's education savings into MORE education savings through free government money and tax-free investment growth. It's one of the best financial tools available to Canadian families!`,

  'resp-2': `The government of Canada wants to help families save for education—so much that they're willing to give you FREE money through grants!

**Canada Education Savings Grant (CESG):**
• Basic rate: 20% on first $2,500/year
• Maximum per year: $500
• Lifetime maximum: $7,200
• Available until age 17

**Additional CESG (for lower-income families):**
• Extra 10-20% on first $500 contributed
• Helps families who need it most

**Canada Learning Bond (CLB):**
• For families with lower incomes
• $500 when you open an RESP
• $100 per year until age 15
• Up to $2,000 total
• NO contributions required!

**Provincial Grants (varies by province):**
• British Columbia: $1,200 one-time grant
• Quebec: QESI grants matching contributions
• Saskatchewan: Up to $500/year grant

**The Power of Grants:**
Imagine: Your family contributes $2,500/year
• Family contribution: $2,500
• CESG grant: $500 (20%)
• Total saved that year: $3,000
That's like getting a 20% return before any investment growth!

**Key Insight:**
These grants are essentially FREE MONEY. Not applying for them is like leaving thousands of dollars on the table. Make sure your family is maximizing all available grants!`,

  'resp-3': `You've saved all this money in your RESP—now what can you actually use it for? Great news: RESPs are incredibly flexible!

**Qualifying Programs:**
• Universities (all programs)
• Colleges (diplomas, certificates)
• Trade schools and apprenticeships
• CEGEP (Quebec)
• Some international programs
• Online accredited programs

**What RESPs Can Pay For:**
✅ Tuition and fees
✅ Textbooks and course materials
✅ Required equipment (laptop, tools, uniform)
✅ Residence/housing costs
✅ Meal plans
✅ Living expenses while studying full-time
✅ Transportation

**How Withdrawals Work:**
There are two types of withdrawals:

1. **PSE (Post-Secondary Education) Withdrawals**
   • Original contributions come back tax-free
   • Can withdraw anytime
   
2. **EAP (Educational Assistance Payment)**
   • Investment growth + grants
   • Taxed in student's hands (usually low/no tax)
   • Must be enrolled in qualifying program

**Timing:**
• Withdraw as needed throughout your studies
• No rush to take it all at once
• Strategic: Spread over multiple years to minimize taxes

**What If You Don't Go to School?**
• Contributions can be withdrawn tax-free
• Grants go back to government
• Growth can be transferred to RRSP or withdrawn (with penalties)
• Can transfer to a sibling's RESP

**Pro Tips:**
• Keep receipts for education expenses
• Withdraw strategically to minimize taxes
• Coordinate with part-time work income
• Consider taking more in years with lower income

**The Bottom Line:**
RESPs give you financial freedom to focus on your education instead of stressing about money. The flexibility means almost any post-secondary path is covered!`
};
