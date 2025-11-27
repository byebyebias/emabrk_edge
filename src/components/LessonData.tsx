// Lesson data for all financial literacy modules

export const budgetingLessons = [
  {
    id: 'budgeting-2',
    title: 'Guess the Price',
    description: 'Learn the real cost of everyday items',
    content: `Think you know how much everyday items cost? Let's find out!

**Your Challenge:**
Guess the price of 4 common household items and see how close you are to real Canadian prices.`,
    isGameLesson: true,
    gameType: 'price' as const,
    totalPoints: 120
  },
  {
    id: 'budgeting-3',
    title: 'Budget Allocation Challenge',
    description: 'Allocate a monthly budget like a pro',
    content: `You have $1,000 per month (excluding housing) to budget across different spending categories.

**Your Challenge:**
Distribute your budget and see how your choices compare to average Canadian spending patterns!`,
    isGameLesson: true,
    gameType: 'budget' as const,
    totalPoints: 125
  }
];

export const savingsLessons = [
  {
    id: 'savings-1',
    title: 'Why Save Money?',
    description: 'Understand the power of saving',
    content: `Saving money isn't about being cheap—it's about having choices and security in your life.

**The Power of Savings:**
• **Freedom** - Buy what you want when you want it
• **Peace of Mind** - Handle emergencies without panic
• **Opportunities** - Take chances when they come up
• **Less Stress** - Money problems are one less worry

**Start Small, Think Big:**
Even saving $25 per month adds up to $300 in a year! That could be:
• A new phone
• Concert tickets for you and friends
• Part of a car down payment
• Emergency fund for unexpected costs

**The Earlier, The Better:**
Starting to save as a teenager gives you a huge advantage. Thanks to compound interest (earning interest on your interest), money saved young grows much faster than money saved later.

**Emergency Funds:**
Financial experts recommend having 3-6 months of expenses saved. As a student, even $500-$1000 can handle most emergencies like phone repairs, car trouble, or unexpected expenses.`,
    questions: [
      {
        id: 's1-q1',
        type: 'multiple-choice' as const,
        question: 'What\'s the best reason to start saving money as a teenager?',
        options: [
          'To impress your friends',
          'Because your parents told you to',
          'To have money for emergencies and goals',
          'To become the richest person in school'
        ],
        correctAnswer: 'To have money for emergencies and goals',
        explanation: 'Saving gives you financial security and helps you achieve your goals. Starting early also builds great habits and lets compound interest work in your favor.',
        points: 50
      },
      {
        id: 's1-q2',
        type: 'scenario' as const,
        question: 'Your phone screen just cracked and repair costs $150. What happens next?',
        scenario: 'You\'ve been saving $50/month for 6 months and have $300 in savings. Your phone screen cracks and needs a $150 repair.',
        options: [
          'Ask parents for money and keep your savings',
          'Use your savings - this is exactly why you saved!',
          'Just live with the cracked screen forever',
          'Buy a completely new phone with credit'
        ],
        correctAnswer: 'Use your savings - this is exactly why you saved!',
        explanation: 'Emergency funds are meant to be used for unexpected expenses like this. You saved for this exact situation, and you still have $150 left over!',
        consequences: {
          'Ask parents for money and keep your savings': 'You avoid the problem but miss learning to use savings responsibly',
          'Use your savings - this is exactly why you saved!': 'Perfect! You handle the emergency independently and still have money left',
          'Just live with the cracked screen forever': 'You keep your savings but the crack might get worse and cost more later',
          'Buy a completely new phone with credit': 'You overspend and create debt when you had a simpler solution'
        },
        points: 75
      }
    ],
    totalPoints: 125
  }
];

export const creditLessons = [
  {
    id: 'credit-1',
    title: 'Credit Score Basics',
    description: 'Learn what affects your credit score',
    content: `Your credit score is like your financial report card—it tells lenders how responsible you are with borrowed money. In Canada, scores range from 300 to 900.

**What Affects Your Credit Score:**
1. **Payment History (35%)** - Most important!
   • Pay all bills on time
   • Even one late payment can hurt

2. **Credit Utilization (30%)**
   • How much credit you're using vs. your limit
   • Keep it below 30% (if limit is $1000, use less than $300)

3. **Length of Credit History (15%)**
   • How long you've had credit
   • Longer is better

4. **Types of Credit (10%)**
   • Mix of credit cards, loans, etc.

5. **New Credit (10%)**
   • Don't apply for too much at once

**Why It Matters:**
• Get approved for apartments
• Lower insurance rates
• Better interest rates on loans and credit cards
• Some employers check credit scores
• Qualify for the best phone plans

**Building Good Credit:**
Start early with a low-limit credit card, always pay on time, and keep balances low. Good habits now = easier life later!`,
    questions: [
      {
        id: 'c1-q1',
        type: 'multiple-choice' as const,
        question: 'What has the biggest impact on your credit score?',
        options: [
          'How much money you make',
          'Whether you pay bills on time',
          'How many social media followers you have',
          'What kind of car you drive'
        ],
        correctAnswer: 'Whether you pay bills on time',
        explanation: 'Payment history makes up 35% of your credit score - the largest factor. Paying all bills on time is the most important thing you can do for your credit.',
        points: 60
      },
      {
        id: 'c1-q2',
        type: 'true-false' as const,
        question: 'Checking your own credit score will hurt your credit.',
        correctAnswer: 'False',
        explanation: 'Checking your own credit score is called a "soft inquiry" and doesn\'t affect your score at all. You should check it regularly to monitor your financial health.',
        points: 40
      }
    ],
    totalPoints: 100
  }
];

export const investmentLessons = [
  {
    id: 'investment-1',
    title: 'Compound Interest Magic',
    description: 'See how money grows over time',
    content: `Compound interest is often called the "eighth wonder of the world"—and for good reason. It's how your money makes money, which then makes more money!

**How It Works:**
Imagine you invest $1,000 at 7% annual return:
• Year 1: $1,000 + $70 = $1,070
• Year 2: $1,070 + $74.90 = $1,144.90
• Year 3: $1,144.90 + $80.14 = $1,225.04

Notice how the amount you earn increases each year? That's compound interest!

**The Time Factor:**
The real magic happens over longer periods:
• $1,000 invested at age 17 → ~$15,000 by age 67
• $1,000 invested at age 25 → ~$7,600 by age 67

Starting just 8 years earlier DOUBLES your money!

**Key Principles:**
1. **Start Early** - Time is your biggest advantage
2. **Be Consistent** - Regular contributions add up
3. **Be Patient** - Compound interest needs time to work
4. **Reinvest Earnings** - Don't withdraw; let it grow

**Real-World Application:**
This is why RESPs are so powerful—government grants + investment growth + time = significantly more money for your education!`,
    questions: [
      {
        id: 'i1-q1',
        type: 'scenario' as const,
        question: 'You have $1000 to invest. When should you start?',
        scenario: 'You\'re 17 with $1000 saved. You could invest it now, or wait until you\'re 25 and have more money.',
        options: [
          'Wait until 25 when you have more money',
          'Start investing now, even with just $1000',
          'Spend it on something fun instead',
          'Keep it in cash under your mattress'
        ],
        correctAnswer: 'Start investing now, even with just $1000',
        explanation: 'Time is your biggest advantage in investing. Starting at 17 gives you 8 more years of compound growth than waiting until 25. That extra time can mean thousands of dollars!',
        consequences: {
          'Wait until 25 when you have more money': 'You miss 8 years of potential growth - time you can never get back',
          'Start investing now, even with just $1000': 'Perfect! Time is your biggest advantage in building wealth',
          'Spend it on something fun instead': 'You enjoy now but miss a huge opportunity to build wealth',
          'Keep it in cash under your mattress': 'Your money loses value to inflation and earns nothing'
        },
        points: 100
      }
    ],
    totalPoints: 100
  }
];

// New comprehensive borrowing and investing lessons
export const newBorrowingLessons = [
  {
    id: 'osap-visuals',
    title: 'OSAP in Action: Interactive Visuals',
    description: 'Explore how OSAP works with interactive tools',
    content: `Now that you understand OSAP, let's see it in action! These interactive tools will help you visualize how OSAP funding works, how the process flows, and how repayment looks over time.

**What You'll Explore:**
• The complete OSAP process from application to repayment
• How OSAP funding breaks down for different programs
• Interest rate comparisons between OSAP and other options
• Your repayment timeline including the grace period

**Why These Matter:**
Understanding these visuals will help you make informed decisions about student loans and see why OSAP is one of the best borrowing options available to students.

**Interactive Tools:**
Try adjusting the sliders and exploring different scenarios to see how OSAP can work for you!`,
    isGameLesson: true,
    gameType: 'osap-visuals' as const,
    totalPoints: 100
  },
  {
    id: 'borrowing-1',
    title: 'Smart Borrowing: OSAP & Student Loans',
    description: 'Learn when and how to borrow wisely for education',
    hasMultiplePages: true,
    pages: [
      {
        id: 1,
        title: 'Introduction to Smart Borrowing',
        content: `Not all debt is bad debt. Student loans, especially OSAP, can be smart investments in your future—if you understand how they work.

**Why Borrowing Can Be Smart:**
Education is one of the few things worth borrowing for because it increases your earning potential. A university graduate in Canada earns an average of $20,000+ more per year than someone with just a high school diploma.

**The Key Question:**
The question isn't "Should I ever borrow?" It's "When is borrowing smart, and what's the best way to do it?"

**What You'll Learn:**
Over the next few pages, we'll explore OSAP (Ontario Student Assistance Program), compare different borrowing options, and learn when borrowing makes sense versus when to avoid it.`
      },
      {
        id: 2,
        title: 'What is OSAP?',
        content: `**OSAP Explained:**
The Ontario Student Assistance Program (OSAP) provides loans and grants to help Ontario students pay for college or university.

**OSAP Key Features:**
• **Low Interest Rate** - Prime rate (much lower than credit cards!)
• **No Payments During School** - Focus on studying, not bills
• **6-Month Grace Period** - After graduation before payments start
• **Income-Based Repayment** - Pay based on what you earn
• **Grants Available** - Free money you don't have to repay!

**Who Can Apply?**
• Ontario residents
• Canadian citizens, permanent residents, or protected persons
• Students enrolled in approved programs
• Those demonstrating financial need

**How Much Can You Get?**
OSAP amounts vary based on your family income, program costs, and living situation. Some students receive mostly grants (free money), while others receive a mix of grants and loans.`
      },
      {
        id: 3,
        title: 'OSAP vs Other Borrowing Options',
        content: `Let's compare OSAP to other ways students might borrow money for school:

**OSAP (Student Loan):**
Interest Rate: ~6% (prime rate)
Payments: None during school, start 6 months after graduation
Flexibility: Income-based repayment available
Best For: Education expenses

**Credit Card:**
Interest Rate: 19.99% (more than 3x OSAP!)
Payments: Start immediately
Flexibility: Minimum payments required monthly
Best For: Emergency purchases only (NOT education)

**Line of Credit:**
Interest Rate: 7-12%
Payments: Start immediately
Flexibility: Must make interest payments
Best For: Flexible borrowing (but not as good as OSAP for school)

**Private Student Loans:**
Interest Rate: 8-15%
Payments: Varies by lender
Flexibility: Less flexible than OSAP
Best For: When OSAP isn't enough (last resort)

**The Clear Winner:**
For education costs, OSAP is BY FAR the best option. Lower interest, no payments during school, and income-based repayment make it designed specifically for students.`
      },
      {
        id: 4,
        title: 'When is Borrowing Smart?',
        content: `Borrowing isn't always bad. Here's when it makes sense:

**✅ SMART Borrowing Situations:**
✅ Education that increases earning potential
✅ You have a clear plan to repay
✅ You're using the lowest-interest option (like OSAP)
✅ The degree/program has good job prospects
✅ You've exhausted scholarships and bursaries first

**❌ When to AVOID Borrowing:**
❌ Consumer goods (clothes, electronics, trips)
❌ High-interest credit cards for non-emergencies
❌ More than you can reasonably repay
❌ Without understanding the terms
❌ For things that lose value immediately

**The Math That Matters:**
Let's say you borrow $30,000 through OSAP for a nursing program:
• Nurses start at ~$65,000/year in Ontario
• That's $20,000+ more than high school graduate jobs
• Your loan pays for itself in about 2-3 years
• Then you enjoy higher income for the next 40+ years!

**The Bottom Line:**
Borrowing for education with OSAP = Smart investment in your future
Borrowing for a new phone with a credit card = Expensive mistake`
      },
      {
        id: 5,
        title: 'Smart OSAP Strategy',
        content: `Now that you understand OSAP, here's how to use it wisely:

**Before You Borrow:**
• Apply for all available scholarships and bursaries first
• Check if you qualify for grants (free money you don't repay)
• Calculate exactly how much you need
• Consider working part-time to reduce borrowing

**While in School:**
• Only borrow what you actually need
• Track how much you're borrowing each year
• Consider making interest payments during school (optional but helpful)
• Keep receipts for education expenses
• Budget carefully to avoid extra borrowing

**Planning for Repayment:**
• Understand your grace period (6 months after graduation)
• Know that payments are based on income (RAP - Repayment Assistance Plan)
• Consider starting payments early if you can afford it
• Don't panic - most graduates successfully repay their loans

**The Key Takeaway:**
OSAP makes education accessible and affordable. Use it strategically, borrow only what you need, and you'll set yourself up for financial success without overwhelming debt.`
      }
    ],
    questions: [
      {
        id: 'b1-q1',
        type: 'multiple-choice' as const,
        question: 'What is the biggest advantage of OSAP over credit cards for education costs?',
        options: [
          'OSAP has higher interest rates',
          'OSAP requires payments immediately',
          'OSAP has low interest and no payments during school',
          'OSAP is only for wealthy students'
        ],
        correctAnswer: 'OSAP has low interest and no payments during school',
        explanation: 'OSAP charges much lower interest (around prime rate vs 19.99% for credit cards) and you don\'t have to make payments while you\'re in school or for 6 months after graduation.',
        points: 40
      },
      {
        id: 'b1-q2',
        type: 'scenario' as const,
        question: 'Should you borrow for this situation?',
        scenario: 'You need $8,000 for tuition and books for a nursing program. Nurses in Ontario start at $65,000/year. You have $2,000 saved.',
        options: [
          'Apply for OSAP to cover the $6,000 gap',
          'Put it all on credit cards at 19.99% interest',
          'Skip school and work minimum wage instead',
          'Only take courses you can afford this year'
        ],
        correctAnswer: 'Apply for OSAP to cover the $6,000 gap',
        explanation: 'This is smart borrowing! Nursing has excellent job prospects and high income. OSAP provides low-interest loans specifically designed for education. The investment will pay off quickly.',
        consequences: {
          'Apply for OSAP to cover the $6,000 gap': 'Smart choice! You invest in education with low-interest debt that will pay for itself',
          'Put it all on credit cards at 19.99% interest': 'Terrible idea - credit cards cost 3-4x more in interest than OSAP',
          'Skip school and work minimum wage instead': 'You miss out on a $65,000/year career to avoid $6,000 in smart debt',
          'Only take courses you can afford this year': 'Delays your career and earning potential unnecessarily'
        },
        points: 60
      },
      {
        id: 'b1-q3',
        type: 'true-false' as const,
        question: 'You should always borrow the maximum amount OSAP offers, even if you don\'t need it all.',
        correctAnswer: 'False',
        explanation: 'Only borrow what you actually need! Every dollar borrowed has to be repaid with interest. Living expenses, part-time work, and budgeting can reduce how much you need to borrow.',
        points: 50
      }
    ],
    totalPoints: 150
  },
  {
    id: 'investing-visual',
    title: 'Investment Growth Visualizer',
    description: 'See your money grow with GICs, stocks, and bonds',
    hasMultiplePages: true,
    pages: [
      {
        id: 1,
        title: 'Introduction to Investing',
        content: `Understanding different investment options is crucial for building wealth. Let's explore how your money can grow over time.

**Why Investing Matters:**
When you invest, your money works for you - earning returns that grow over time. Even small amounts invested early can turn into significant wealth thanks to compound interest.

**What We'll Cover:**
Over the next few pages, we'll explore three main investment types that are perfect for students and young adults: GICs, stock market index funds, and government bonds.

**The Power of Starting Early:**
A 17-year-old who invests $1,000 will have much more money by retirement than someone who waits until age 25 - even if they invest the exact same amount. Time is your biggest advantage!`
      },
      {
        id: 2,
        title: 'GICs - Guaranteed Investment Certificates',
        content: `**What is a GIC?**
A Guaranteed Investment Certificate is like lending money to a bank. They pay you interest, and your money is guaranteed - you can't lose it.

**Key Features:**
• **Safe & Guaranteed** - Your money is protected by CDIC (up to $100,000)
• **Fixed Interest Rate** - Currently around 4.5% per year
• **Locked In** - Money is locked for a set time (1, 3, 5 years)
• **No Risk** - You get your money back plus interest, guaranteed

**Perfect For:**
✅ Short-term goals (1-5 years)
✅ Emergency funds
✅ People who can't handle risk
✅ Money you'll need soon

**Example:**
Invest $1,000 in a 5-year GIC at 4.5%:
• Year 1: $1,045
• Year 3: $1,141
• Year 5: $1,247
You make $247 in guaranteed interest!

**The Trade-off:**
Safety = Lower returns. GICs are super safe, but you won't get rich quickly. They're perfect for money you can't afford to lose.`
      },
      {
        id: 3,
        title: 'S&P 500 Index Funds - Stock Market Investing',
        content: `**What is the S&P 500?**
The S&P 500 tracks 500 of the largest US companies (Apple, Microsoft, Amazon, etc.). When you buy an S&P 500 index fund, you own a tiny piece of all these companies.

**Key Features:**
• **Higher Returns** - Historical average of ~10% per year
• **Higher Risk** - Value goes up AND down
• **Long-Term Focus** - Best for 5+ years
• **Diversified** - You own 500 companies, not just one

**Perfect For:**
✅ Long-term goals (retirement, house down payment in 10+ years)
✅ People who can handle ups and downs
✅ Money you won't need soon
✅ Building wealth over time

**Example:**
Invest $1,000 in S&P 500 for 5 years at ~10%:
• Year 1: $1,100
• Year 3: $1,331
• Year 5: $1,611
You make $611 - much more than a GIC!

**The Trade-off:**
Some years you might lose money (2022 was down 18%). But historically, patient investors always make money over 5+ years.

**Important:**
Never invest money in stocks that you'll need within 2-3 years. Short-term, markets are unpredictable. Long-term, they tend to go up.`
      },
      {
        id: 4,
        title: 'Government Bonds - Steady & Reliable',
        content: `**What are Government Bonds?**
When you buy a government bond, you're lending money to the Canadian government. They pay you interest and promise to pay you back.

**Key Features:**
• **Very Safe** - Backed by the Canadian government
• **Fixed Interest** - Around 4% per year
• **Predictable** - You know exactly what you'll get
• **Steady Income** - Regular interest payments

**Perfect For:**
✅ Conservative investors
✅ People nearing retirement
✅ Steady, predictable returns
✅ Safer than stocks, better than savings accounts

**Example:**
Invest $1,000 in bonds at 4% for 5 years:
• Year 1: $1,040
• Year 3: $1,125
• Year 5: $1,217
You make $217 - safer than stocks, slightly less than GICs

**The Trade-off:**
Bonds are super safe and predictable, but returns are lower than stocks. Great for part of your portfolio, but probably not all of it when you're young.

**Mix It Up:**
Many investors own a mix - some stocks for growth, some bonds for stability, and some GICs for safety.`
      },
      {
        id: 5,
        title: 'Comparing Your Options',
        content: `Let's compare how $1,000 grows in each investment over 5 years:

**GIC (4.5%):**
5 years → $1,247
Gained: $247
Risk: None

**S&P 500 Index (~10%):**
5 years → $1,611
Gained: $611
Risk: Moderate (short-term volatility)

**Government Bonds (4%):**
5 years → $1,217
Gained: $217
Risk: Very low

**The Big Difference:**
$611 - $247 = $364 more with stocks!
But stocks can drop short-term, while GICs are guaranteed.

**Smart Strategy for Students:**
• **Emergency Fund** - Keep in savings or GIC
• **Short-Term Goals** (1-3 years) - GICs or bonds
• **Long-Term Goals** (5+ years) - S&P 500 index funds
• **Mix** - Combine all three as you get older

**The Interactive Challenge:**
You'll explore all three investment types and see exactly how money grows over 1, 3, and 5 years with real charts and calculations!`
      }
    ],
    isGameLesson: true,
    gameType: 'investment-visualizer' as const,
    totalPoints: 150
  },
  {
    id: 'borrow-invest-scenarios',
    title: 'Borrow or Invest? Real-Life Decisions',
    description: 'Make smart financial decisions with real personas',
    hasMultiplePages: true,
    pages: [
      {
        id: 1,
        title: 'Introduction to Financial Decisions',
        content: `Financial decisions aren't always clear-cut. Should you borrow? Should you invest? Should you pay off debt first? Let's learn to make smart choices.

**The Real Challenge:**
In real life, you'll face situations where the "right answer" isn't obvious. You might have debt to pay off, money to invest, and opportunities to borrow - all at the same time.

**What You'll Learn:**
Through 4 real-life scenarios with different people, you'll practice making financial decisions. Each person faces a different situation, and you'll help them choose the best path.

**No Judgment:**
There's no shame in borrowing when it makes sense. There's no shame in being cautious. The key is making informed decisions based on your situation.`
      },
      {
        id: 2,
        title: 'When to Borrow Money',
        content: `Borrowing money isn't automatically bad. Here's when it makes sense:

**✅ SMART Borrowing Situations:**
✅ Education with good job prospects
✅ Emergency needs (medical, essential repairs)
✅ Assets that gain value (rarely applies to students)
✅ Using low-interest options like OSAP

**Why These Are Smart:**
Education increases your earning power. A $30,000 OSAP loan for a nursing degree pays itself back in 2-3 years because nurses earn $20,000+ more per year than high school graduates.

**❌ When NOT to Borrow:**
❌ Consumer goods that lose value (phones, clothes, trips)
❌ Using high-interest credit cards
❌ Lifestyle expenses beyond your means
❌ Without a repayment plan

**Why These Are Risky:**
A $1,200 phone on a 19.99% credit card costs $1,440+ if you don't pay it off fast. The phone loses value immediately, but the debt grows.`
      },
      {
        id: 3,
        title: 'When to Invest Your Money',
        content: `Investing helps your money grow, but timing matters. Here's when to invest:

**✅ SMART Investing Situations:**
✅ After building emergency fund ($500-$1,000 for students)
✅ Money you won't need for 3+ years
✅ When you have no high-interest debt
✅ Starting early (time is your friend!)

**Why Emergency Fund First:**
If you invest all your money and your car breaks down, you'll have to sell investments (possibly at a loss) or use credit cards. Always have a safety cushion first.

**Why Long-Term Matters:**
Stock markets go up and down. If you need money in 6 months, don't invest it in stocks. But if you won't need it for 5+ years, investing gives you the best returns.

**❌ When to Pay Off Debt First:**
❌ Credit card debt over 15% interest
❌ Any debt that stresses you out
❌ Debt that's growing faster than investments

**The Golden Rule:**
Can't reliably earn 19.99% in the stock market? Then pay off that credit card before investing. Paying off a 20% debt is like earning a guaranteed 20% return!`
      },
      {
        id: 4,
        title: 'Making Smart Trade-offs',
        content: `Real life means balancing multiple priorities. Here's how to think about trade-offs:

**The Priority System:**
1. **Emergency Fund First** - $500-$1,000 minimum
2. **Pay Off High-Interest Debt** - Anything over 10% interest
3. **Smart Borrowing** - OSAP for education if needed
4. **Invest Long-Term Money** - Money you won't need for 5+ years
5. **Pay Extra on Low-Interest Debt** - After above are handled

**Example Trade-off:**
You have $1,000. You could:
• Pay off $1,000 credit card debt (19.99% interest)
• Invest in stocks (might earn 10% average)

**Smart Choice:** Pay off the credit card! Saving 19.99% in interest beats earning 10% in stocks.

**Another Example:**
You have $2,000, no debt, and won't need money for 10 years:
• Keep it all in savings (0.5% interest)
• Invest in S&P 500 index fund (~10% average)

**Smart Choice:** Invest most of it! Keep $500-$1,000 as emergency fund, invest the rest for long-term growth.

**Ready to Practice:**
You'll meet 4 different people and help them make real financial decisions. There's no single right answer - it depends on their situation!`
      }
    ],
    isGameLesson: true,
    gameType: 'borrow-invest-scenarios' as const,
    totalPoints: 235
  }
];

export const respLessons = [
  {
    id: 'resp-1',
    title: 'RESP Basics: Your Education Fund',
    description: 'Learn how RESPs work and why they\'re amazing',
    videoUrl: './public/videos/resp_explainer.mp4',
    content: `An RESP (Registered Education Savings Plan) is Canada's gift to students—a special savings account designed specifically for post-secondary education.

**What Makes RESPs Special?**
• Government Grants - Free money added to your savings!
• Tax-Free Growth - Investments grow without tax
• Flexible Use - University, college, trade school, apprenticeships
• Family Friendly - Parents, grandparents, anyone can contribute

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
    questions: [
      {
        id: 'r1-q1',
        type: 'multiple-choice' as const,
        question: 'What does RESP stand for?',
        options: [
          'Really Exciting Savings Plan',
          'Registered Education Savings Plan',
          'Reliable Education Support Program',
          'Registered Emergency Savings Plan'
        ],
        correctAnswer: 'Registered Education Savings Plan',
        explanation: 'RESP stands for Registered Education Savings Plan - it\'s a Canadian government program designed to help families save for post-secondary education.',
        points: 40
      },
      {
        id: 'r1-q2',
        type: 'scenario' as const,
        question: 'Your parents contribute $100/month to your RESP. What happens next?',
        scenario: 'Your parents have been putting $100 every month into your RESP account since you were born. You\'re now 16 and wondering what all this means.',
        options: [
          'The government adds nothing - it\'s just your parents\' money',
          'The government adds 20% on top as a grant!',
          'The money is locked away until you\'re 30',
          'You can use it for anything you want right now'
        ],
        correctAnswer: 'The government adds 20% on top as a grant!',
        explanation: 'The Canada Education Savings Grant (CESG) gives you 20% on contributions up to $2,500 per year. So if your parents put in $100, the government adds $20 - it\'s FREE money!',
        consequences: {
          'The government adds nothing - it\'s just your parents\' money': 'You\'re missing out on understanding the amazing government grants',
          'The government adds 20% on top as a grant!': 'Exactly! The CESG makes RESPs incredibly powerful - free money from the government',
          'The money is locked away until you\'re 30': 'Not quite - you can access it for education starting at any age',
          'You can use it for anything you want right now': 'The money is specifically for education, but that\'s what makes the grants possible'
        },
        points: 80
      },
      {
        id: 'r1-q3',
        type: 'true-false' as const,
        question: 'You can only use RESP money for university, not college or trade school.',
        correctAnswer: 'False',
        explanation: 'RESPs can be used for ANY qualifying post-secondary education - university, college, trade schools, apprenticeships, and even some international programs. It\'s very flexible!',
        points: 50
      }
    ],
    totalPoints: 170
  },
  {
    id: 'resp-2',
    title: 'RESP Grants: Free Money from Government',
    description: 'Maximize your government benefits',
    content: `The government of Canada wants to help families save for education—so much that they're willing to give you FREE money through grants!

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
    questions: [
      {
        id: 'r2-q1',
        type: 'multiple-choice' as const,
        question: 'What\'s the maximum CESG grant you can get per year?',
        options: [
          '$300 per year',
          '$500 per year',
          '$600 per year',
          '$1,000 per year'
        ],
        correctAnswer: '$500 per year',
        explanation: 'The maximum Canada Education Savings Grant is $500 per year (20% of $2,500 in contributions). Over 18 years, that\'s up to $7,200 in free money!',
        points: 60
      },
      {
        id: 'r2-q2',
        type: 'scenario' as const,
        question: 'Your family income is lower than average. Are there extra RESP benefits?',
        scenario: 'Your family income is $45,000 per year, which is below the Canadian average. You\'re wondering if this affects your RESP benefits.',
        options: [
          'No difference - everyone gets the same grants',
          'Lower income families get extra grants and bonds',
          'Lower income families get less money',
          'Only wealthy families can have RESPs'
        ],
        correctAnswer: 'Lower income families get extra grants and bonds',
        explanation: 'Families with lower incomes get EXTRA benefits! The Additional CESG gives up to 10% extra on the first $500 contributed, plus the Canada Learning Bond can add $2,000 over time with no contributions required!',
        consequences: {
          'No difference - everyone gets the same grants': 'Actually, Canada provides extra support for lower-income families',
          'Lower income families get extra grants and bonds': 'Exactly! Canada wants to ensure all students can afford education regardless of income',
          'Lower income families get less money': 'It\'s the opposite - Canada provides MORE support for families who need it',
          'Only wealthy families can have RESPs': 'RESPs are for everyone, and lower-income families get the most government support'
        },
        points: 90
      },
      {
        id: 'r2-q3',
        type: 'multiple-choice' as const,
        question: 'If you don\'t use your RESP for education, what happens to the government grants?',
        options: [
          'You keep all the grant money',
          'The grants go back to the government',
          'You pay taxes on the grants',
          'The grants transfer to your parents'
        ],
        correctAnswer: 'The grants go back to the government',
        explanation: 'If the RESP isn\'t used for qualifying education, the government grants (CESG, CLB, etc.) must be returned. However, your family keeps all the original contributions plus any investment growth on those contributions.',
        points: 70
      }
    ],
    totalPoints: 220
  },
  {
    id: 'resp-3',
    title: 'Using Your RESP: Education Expenses',
    description: 'Learn what you can pay for with RESP funds',
    content: `You've saved all this money in your RESP—now what can you actually use it for? Great news: RESPs are incredibly flexible!

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
RESPs give you financial freedom to focus on your education instead of stressing about money. The flexibility means almost any post-secondary path is covered!`,
    questions: [
      {
        id: 'r3-q1',
        type: 'scenario' as const,
        question: 'You\'re starting college and need to pay various expenses. Which can you use RESP money for?',
        scenario: 'You\'re enrolled in a 2-year Animation program at Sheridan College. You need to pay tuition ($3,500), buy a laptop ($1,200), pay residence fees ($8,000), and buy textbooks ($400).',
        options: [
          'Only tuition costs',
          'Tuition and textbooks only',
          'All of these expenses',
          'None - RESPs are only for universities'
        ],
        correctAnswer: 'All of these expenses',
        explanation: 'RESPs can pay for tuition, books, supplies, equipment, residence, and even living expenses while you\'re a full-time student. And yes, college programs like Animation definitely qualify!',
        consequences: {
          'Only tuition costs': 'RESPs are much more flexible than that - they cover most education-related expenses',
          'Tuition and textbooks only': 'Close, but RESPs also cover residence, supplies, and living expenses',
          'All of these expenses': 'Perfect! RESPs are designed to cover the full cost of post-secondary education',
          'None - RESPs are only for universities': 'College programs absolutely qualify - RESPs support all types of post-secondary education'
        },
        points: 85
      },
      {
        id: 'r3-q2',
        type: 'true-false' as const,
        question: 'You must spend all RESP money in the first year of school.',
        correctAnswer: 'False',
        explanation: 'You can withdraw RESP funds throughout your entire education journey. Many students spread withdrawals over multiple years to match their actual expenses and manage taxes effectively.',
        points: 45
      },
      {
        id: 'r3-q3',
        type: 'multiple-choice' as const,
        question: 'Who pays taxes on RESP withdrawals?',
        options: [
          'Your parents pay all the taxes',
          'The government pays the taxes',
          'You (the student) pay taxes on the growth portion',
          'No one pays taxes on RESP money'
        ],
        correctAnswer: 'You (the student) pay taxes on the growth portion',
        explanation: 'The student pays income tax on the investment growth and government grants portion (called EAP - Educational Assistance Payment). Since most students have low income, they often pay little to no tax. Original contributions come back tax-free.',
        points: 75
      }
    ],
    totalPoints: 205
  }
];

// Combined modules for streamlined learning experience
export const budgetingAndSavingLessons = [...budgetingLessons, ...savingsLessons];
export const borrowingAndInvestingLessons = [...newBorrowingLessons];

export const allLessons = {
  'resp': respLessons,
  'budgetingAndSaving': budgetingAndSavingLessons,
  'borrowingAndInvesting': borrowingAndInvestingLessons
};