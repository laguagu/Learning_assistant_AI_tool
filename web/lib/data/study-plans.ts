export interface ModuleContent {
  title: string;
  description: string;
  content: string;
}

export interface StudyPlan {
  id_username: string;
  modules: {
    module1: ModuleContent;
    module2: ModuleContent;
    module3: ModuleContent;
    module4: ModuleContent;
    module5: ModuleContent;
  };
}

export const studyPlans: StudyPlan[] = [
  {
    id_username: "anil.tampere@example.com",
    modules: {
      module1: {
        title: "Understanding AI basics",
        description:
          "Learn fundamental technologies and ecosystems of AI and their relevance to business.",
        content: `# Smart learning plan (onboarding)

Dear Anil,

Thank you for participating in our Entrepreneurship Training Course! Below is your plan to build the foundational skills you currently rate as beginner.

## Essential learning topics and materials

## 1 Generative AI skills  
To be able to utilize the commonly used generative AI tools, you will need some basic knowledge and training on them. 
Learning Resources: Explore materials on [Generative AI for Beginners](https://github.com/microsoft/generative-ai-for-beginners) and [Introduction to Generative AI](https://www.cloudskillsboost.google/course_templates/536).
Practice Tip: Choose one generative AI service (ChatGPT, Copilot, Gemini or Claude), sign into its free version and familiarize yourself with creating content using AI.

## 2 Running a Business  
To be able to consider all aspects of running a successful business, you'll need some basic knowledge and training on them.
Learning Resources: SBA.gov and Small Business Development Centers (SBDCs) offer beginner resources for business management.
Practice Tip: Study case studies on small business operations and identify essential operational processes. You can use generative AI to assist you.

We are glad to have you onboard :) If you have any questions, please contact teachers.`,
      },
      module2: {
        title: "AI for Business Planning",
        description:
          "Using AI tools to clarify business ideas, perform market analysis, and create customer personas.",
        content: `# Smart learning plan (training)

Dear Anil,

These recommendations are designed to support your preparation for Module 2.

## Learning objectives

* Define Your Business Idea: Use AI tools to clarify and define your food delivery or retail business idea, focusing on ethnic foods for immigrant communities in Finland.
* Market Analysis: Utilize AI for competitor and market analysis to identify opportunities and challenges specific to the ethnic food market in Finland.
* Customer Personas: Create detailed customer personas and map customer journeys using AI to enhance your understanding of your target audience.
* Business Plan Refinement: Use AI tools to analyze customer insights and refine your business plan, ensuring it aligns with market needs and customer preferences.

## Assignments

## Business Idea Definition:
* Assignment: Use a generative AI tool (like ChatGPT) to brainstorm and outline your business idea. Describe the niche you want to target and the unique selling proposition (USP) of your food delivery service.
* Process: Document the prompts you used to generate ideas and the responses you received. Reflect on how these ideas can be integrated into your business plan.

## Market Analysis:
* Assignment: Conduct a PESTEL analysis of the ethnic food market in Finland using AI tools. Identify at least three key opportunities and challenges.
* Process: Use AI to gather data and insights, and explain the prompts and tools you used to conduct the analysis. Summarize your findings in a report format.

## Customer Personas:
* Assignment: Create at least two customer personas for your target market using AI. Focus on demographics, preferences, and pain points related to food delivery services.
* Process: Use AI to generate persona profiles and document the prompts used. Map out a customer journey for one of the personas, highlighting key touchpoints.

## Business Plan Refinement:
* Assignment: Analyze customer insights using AI tools and refine your business plan accordingly. Focus on how AI can help optimize your operations and marketing strategies.
* Process: Document the AI tools and prompts you used to gather insights and how they influenced your business plan revisions. Prepare a summary of the changes made.

We hope these recommendations will help you prepare for Module 2. If you have any questions, please contact your teachers.`,
      },
      module3: {
        title: "Business Prompting Workshop",
        description:
          "Apply structured prompts for business impact and learn to assess AI tools.",
        content: `# Smart learning plan (training)

Dear Anil,

These recommendations are designed to support your preparation for module 3.

## Learning objectives

* Understand AI's role in compliance and legal issues: Learn how AI can assist in navigating the legal landscape of starting a food delivery or retail business in Finland, particularly focusing on regulations that affect immigrant entrepreneurs.
* Assess the validity and reliability of AI tools: Develop the ability to evaluate different AI tools that can be used for business tasks, ensuring they meet the specific needs of your target market.
* Utilize content creation tools for business tasks: Gain hands-on experience in using AI tools to create marketing materials and business documents that resonate with the immigrant community in Finland.
* Apply structured prompts for business impact: Learn to create effective prompts that can generate valuable insights and content for your business, enhancing your decision-making process.

## Assignments

## Compliance and Legal AI Research:
* Task: Use an AI tool (like ChatGPT) to research the legal requirements for starting a food delivery business in Finland. Create a summary of the key regulations you need to consider.
* Process: Document the prompts you used to gather information and explain how AI helped you understand the legal landscape.

## AI Tool Evaluation:
* Task: Identify and compare at least three AI tools that can assist in market analysis for your business. Create a simple evaluation chart based on features, usability, and relevance to your target market.
* Process: Share the prompts you used to gather information about each tool and your criteria for evaluation.

## Marketing Material Creation:
* Task: Use an AI content creation tool to design a flyer or social media post promoting your food delivery service. Focus on appealing to the immigrant community in Finland.
* Process: Explain the prompts you used to generate content and how you tailored the message to your audience.

## Structured Prompt Development:
* Task: Create a set of structured prompts that you can use with an AI tool to generate customer insights or marketing strategies for your business.
* Process: Document the reasoning behind each prompt and how you expect the AI to assist you in making informed business decisions.

We hope these recommendations will help you prepare for module 3. If you have any questions, please contact your teachers.`,
      },
      module4: {
        title: "AI for Business Success",
        description:
          "Use AI tools for strategic marketing and customer engagement.",
        content: `# Smart learning plan (training)

Dear Anil,

These recommendations are designed to support your preparation for module 4.

## Learning objectives

* Develop a strategic marketing plan for your food delivery business using AI tools.
  * Focus on identifying your target audience within the immigrant community in Finland and how to effectively reach them.
* Create engaging marketing content using AI-powered tools.
  * Learn to design promotional materials that resonate with your target market, emphasizing the unique aspects of ethnic foods.
* Utilize AI chatbots for customer service and engagement.
  * Explore how AI can enhance customer interactions and improve service efficiency in your business.
* Apply future-thinking techniques to anticipate trends in the food delivery market.
  * Use AI to analyze data and predict future consumer preferences, helping you stay ahead of the competition.

## Assignments

## Assignment 1: Marketing Plan Creation
* Use an AI tool like ChatGPT to draft a marketing plan for your food delivery business. Include sections on target audience, marketing channels, and promotional strategies. Document the prompts you used to generate ideas and refine your plan.

## Assignment 2: Content Generation
* Create a series of social media posts or advertisements for your business using an AI content generator. Focus on highlighting the cultural significance of the dishes you plan to offer. Share the prompts you used and explain how the generated content aligns with your brand message.

## Assignment 3: Chatbot Development
* Research and select an AI chatbot platform. Design a simple chatbot script that can answer common customer inquiries about your food delivery service. Document the process of setting up the chatbot and the prompts you used to create the conversation flow.

## Assignment 4: Trend Analysis Report
* Use AI tools to gather data on current trends in the food delivery industry. Create a report that outlines potential future trends and how they could impact your business. Include the AI tools you used for data collection and analysis, along with the prompts that guided your research.

We hope these recommendations will help you prepare for module 4. If you have any questions, please contact your teachers.`,
      },
      module5: {
        title: "AI Hackathon Challenge",
        description:
          "Apply your AI skills in a collaborative hackathon to solve food delivery business challenges.",
        content: `# AI Hackathon Challenge

Dear Anil,

Congratulations on reaching the hackathon phase of our program! This is your opportunity to apply everything you've learned about AI to solve real business challenges related to your food delivery venture.

## Hackathon Overview

The hackathon will take place over 48 hours, during which you'll work collaboratively to develop an AI-powered solution that addresses a specific challenge in the food delivery industry. This is your chance to showcase your skills, creativity, and business acumen.

## Challenge Options

### 1. AI-Powered Menu Optimization
Create a solution that helps restaurants in your network optimize their menus for delivery, considering factors like ingredients, preparation time, packaging, and cultural preferences of immigrant communities.

### 2. Intelligent Delivery Routing
Develop an AI system that optimizes delivery routes based on multiple factors including traffic patterns, delivery clustering, and driver availability to reduce costs and delivery times.

### 3. Customer Retention and Personalization 
Build a personalized recommendation system that analyzes customer ordering patterns and preferences to increase repeat orders and customer lifetime value.

## Preparation Tasks

### Research Phase:
* Identify and document the specific problem you want to solve within your chosen challenge area.
* Research existing solutions and identify gaps or opportunities for improvement.
* Define success metrics for your solution.

### Planning Phase:
* Outline the key components of your solution including which AI tools and technologies you'll use.
* Create a project plan for the hackathon, including tasks, responsibilities, and timelines.
* Prepare a list of data sources or requirements for your solution.

### Skills Assessment:
* Evaluate your team's current AI skills and identify any knowledge gaps.
* Complete tutorials or practice exercises on specific AI tools you plan to use during the hackathon.
* Prepare any templates or starter code that might help you work efficiently during the event.

We look forward to seeing your innovative solutions at the hackathon! This is a great opportunity to receive feedback from mentors and potential investors, so make the most of it.

If you have any questions, please contact the hackathon organizers.`,
      },
    },
  },
  {
    id_username: "sara.espoo@example.com",
    modules: {
      module1: {
        title: "Understanding AI basics",
        description:
          "Learn fundamental technologies and ecosystems of AI and their relevance to beauty business.",
        content: `# Smart learning plan (onboarding)

Dear Sara,

Thank you for participating in our Entrepreneurship Training Course! Below is your plan to build the foundational skills you currently rate as beginner.

## Essential learning topics and materials

## 1 Generative AI skills  
To be able to utilize the commonly used generative AI tools, you will need some basic knowledge and training on them. 
Learning Resources: Explore materials on [Generative AI for Beginners](https://github.com/microsoft/generative-ai-for-beginners) and [Introduction to Generative AI](https://www.cloudskillsboost.google/course_templates/536).
Practice Tip: Choose one generative AI service (ChatGPT, Copilot, Gemini or Claude), sign into its free version and familiarize yourself with creating content using AI.

## 2 Making a Business Plan  
To be able to make an effective business plan, you'll need some basic knowledge and training on them.
Learning Resources: Try HubSpot's free "Business Plan Template" and review tutorials on creating business plans on LinkedIn Learning.
Practice Tip: Draft a mini-business plan, focusing on basic sections such as vision, goals, target audience, and financial projections. You can use generative AI to assist you.

## 3 Running a Business  
To be able to consider all aspects of running a successful business, you'll need some basic knowledge and training on them.
Learning Resources: SBA.gov and Small Business Development Centers (SBDCs) offer beginner resources for business management.
Practice Tip: Study case studies on small business operations and identify essential operational processes. You can use generative AI to assist you.

We are glad to have you onboard :) If you have any questions, please contact teachers.`,
      },
      module2: {
        title: "AI for Beauty Business Planning",
        description:
          "Using AI tools to clarify beauty salon business ideas, perform market analysis, and create customer personas.",
        content: `# Smart learning plan (training)

Dear Sara,

These recommendations are designed to support your preparation for module 2.

## Learning objectives

1. Define Your Business Idea: Use AI tools to clarify and articulate your vision for the beauty salon, focusing on the unique services you plan to offer to the local community.
2. Market Analysis: Utilize AI for competitor analysis in the beauty industry in Espoo, identifying key players and potential gaps in the market that your salon can fill.
3. Customer Personas: Create detailed customer personas using AI tools to better understand your target audience, particularly focusing on immigrant women and their specific beauty needs.
4. Business Plan Development: Leverage AI to draft the initial version of your business plan, incorporating insights from your market analysis and customer personas.

## Assignments

## Business Idea Clarity:
* Assignment: Use a generative AI tool (like ChatGPT) to brainstorm and refine your business idea. Prompt: "Help me outline a unique beauty salon concept that caters to immigrant women in Espoo, focusing on hairdressing and skincare services."
* Process: Document the responses and select the elements that resonate most with your vision.

## Competitor Analysis:
* Assignment: Conduct a PESTEL analysis of the beauty industry in Espoo using AI tools. Prompt: "Analyze the political, economic, social, technological, environmental, and legal factors affecting beauty salons in Espoo."
* Process: Summarize the findings and identify at least three competitors, noting their strengths and weaknesses.

## Customer Personas Creation:
* Assignment: Use an AI tool to create customer personas. Prompt: "Generate customer personas for a beauty salon targeting immigrant women in Espoo, including demographics, needs, and preferences."
* Process: Create at least three distinct personas and describe how your salon can meet their needs.

## Business Plan Drafting:
* Assignment: Utilize a custom GPT to draft the first version of your business plan. Prompt: "Draft a business plan for a beauty salon that serves both immigrant and local communities in Espoo, including services, target market, and marketing strategies."
* Process: Review the draft, make necessary adjustments, and outline the next steps for refining your business plan.

We hope these recommendations will help you prepare for module 2. If you have any questions, please contact your teachers.`,
      },
      module3: {
        title: "Business Prompting Workshop",
        description:
          "Apply structured prompts for beauty business impact and learn to assess AI tools.",
        content: `# Smart learning plan (training)

Dear Sara,

These recommendations are designed to support your preparation for module 3.

## Learning objectives

* Understand how AI can assist in compliance with Finnish business regulations: Learn about the legal requirements for starting a beauty salon in Finland and how AI tools can help you stay compliant.
* Assess the validity and reliability of AI tools for beauty industry applications: Explore different AI tools that can be used in the beauty industry, focusing on their effectiveness and reliability.
* Utilize content creation tools to develop marketing materials for your salon: Create engaging content that reflects your brand and appeals to your target audience using AI.
* Apply structured prompts to generate business insights and self-development resources: Use AI to create prompts that can help you gather insights about your customers and improve your business strategies.

## Assignments

## Research and Compliance Report:
Use an AI tool (like ChatGPT) to generate a report on the legal requirements for starting a beauty salon in Finland. Include prompts you used to gather information and summarize how AI helped you understand these regulations.

## AI Tool Evaluation:
Identify three AI tools that can assist in beauty industry tasks (e.g., customer engagement, marketing). Create a comparison chart that evaluates their features, reliability, and potential applications for your salon. Document the prompts you used to gather this information.

## Marketing Material Creation:
Use an AI content creation tool (like Canva with AI features) to design a promotional flyer for your beauty salon. Describe the process you followed, including the prompts you used to generate content and visuals that align with your brand.

## Customer Insight Generation:
Create a set of structured prompts to gather insights about your target customers (e.g., preferences, needs). Use an AI tool to analyze the responses and summarize the findings. Explain how these insights can inform your business strategy.

We hope these recommendations will help you prepare for module 3. If you have any questions, please contact your teachers.`,
      },
      module4: {
        title: "AI for Beauty Business Success",
        description:
          "Use AI tools for strategic beauty salon marketing and customer engagement.",
        content: `# Smart learning plan (training)

Dear Sara,

These recommendations are designed to support your preparation for module 4.

## Learning objectives

* Develop a strategic marketing plan for your beauty salon using AI tools.
  * Focus on identifying your target audience, including the local immigrant community and broader customer base.
* Create engaging marketing content that resonates with your audience.
  * Utilize AI-powered tools to generate promotional materials, social media posts, and advertisements.
* Implement AI-driven customer service solutions to enhance client engagement.
  * Explore chatbots and other AI tools to improve customer interaction and service efficiency.
* Analyze market trends and customer feedback using AI to refine your business strategy.
  * Use AI tools to gather insights from customer interactions and market data to adapt your offerings.

## Assignments

## Assignment 1: Marketing Plan Development
* Use an AI tool like ChatGPT to draft a strategic marketing plan for your beauty salon. Include sections on target audience, marketing channels, and promotional strategies. Document the prompts you used to generate the content and explain your choices.

## Assignment 2: Content Creation
* Create a series of social media posts using an AI content generator. Focus on themes that appeal to your target audience, such as beauty tips for immigrant women. Share the generated content and describe how you tailored the prompts to achieve the desired tone and message.

## Assignment 3: Customer Engagement with AI
* Research and implement a simple AI chatbot for your salon's website or social media. Document the setup process, including the prompts used to train the chatbot on common customer inquiries. Reflect on how this tool can improve customer service.

## Assignment 4: Market Analysis
* Conduct a market analysis using AI tools to gather insights on customer preferences and trends in the beauty industry. Summarize your findings and suggest how you can adapt your business strategy based on this data. Include the AI tools and prompts you used in your analysis.

We hope these recommendations will help you prepare for module 4. If you have any questions, please contact your teachers.`,
      },
      module5: {
        title: "AI Hackathon Challenge",
        description:
          "Apply your AI skills in a collaborative hackathon to solve beauty salon business challenges.",
        content: `# AI Hackathon Challenge

Dear Sara,

Congratulations on reaching the hackathon phase of our program! This is your opportunity to apply everything you've learned about AI to solve real business challenges related to your beauty salon venture.

## Hackathon Overview

The hackathon will take place over 48 hours, during which you'll work collaboratively to develop an AI-powered solution that addresses a specific challenge in the beauty industry. This is your chance to showcase your skills, creativity, and business acumen.

## Challenge Options

### 1. Smart Appointment Scheduling
Develop an AI-powered scheduling system that optimizes salon appointments based on service duration, stylist availability, and client preferences to maximize efficiency and revenue.

### 2. Personalized Beauty Recommendations
Create a solution that provides personalized product and service recommendations based on client profiles, preferences, and beauty goals, specifically catering to diverse clientele including immigrant women.

### 3. Client Retention and Engagement
Build an AI system that identifies at-risk clients and generates personalized re-engagement strategies to improve client retention and lifetime value.

## Preparation Tasks

### Research Phase:
* Identify and document the specific problem you want to solve within your chosen challenge area.
* Research existing solutions and identify gaps or opportunities for improvement.
* Define success metrics for your solution.

### Planning Phase:
* Outline the key components of your solution including which AI tools and technologies you'll use.
* Create a project plan for the hackathon, including tasks, responsibilities, and timelines.
* Prepare a list of data sources or requirements for your solution.

### Skills Assessment:
* Evaluate your team's current AI skills and identify any knowledge gaps.
* Complete tutorials or practice exercises on specific AI tools you plan to use during the hackathon.
* Prepare any templates or starter code that might help you work efficiently during the event.

We look forward to seeing your innovative solutions at the hackathon! This is a great opportunity to receive feedback from mentors and potential investors, so make the most of it.

If you have any questions, please contact the hackathon organizers.`,
      },
    },
  },
  {
    id_username: "oksana.tallinn@example.com",
    modules: {
      module1: {
        title: "Understanding AI basics",
        description:
          "Learn fundamental technologies and ecosystems of AI and their relevance to e-commerce business.",
        content: `# Smart learning plan (onboarding)

Dear Oksana,

Thank you for participating in our Entrepreneurship Training Course! Below is your plan to build the foundational skills you currently rate as beginner.

## Essential learning topics and materials

## 1 Generative AI skills  
To be able to utilize the commonly used generative AI tools, you will need some basic knowledge and training on them. 
Learning Resources: Explore materials on [Generative AI for Beginners](https://github.com/microsoft/generative-ai-for-beginners) and [Introduction to Generative AI](https://www.cloudskillsboost.google/course_templates/536).
Practice Tip: Choose one generative AI service (ChatGPT, Copilot, Gemini or Claude), sign into its free version and familiarize yourself with creating content using AI.

## 2 Making a Business Plan  
To be able to make an effective business plan, you'll need some basic knowledge and training on them.
Learning Resources: Try HubSpot's free "Business Plan Template" and review tutorials on creating business plans on LinkedIn Learning.
Practice Tip: Draft a mini-business plan, focusing on basic sections such as vision, goals, target audience, and financial projections. You can use generative AI to assist you.

## 3 Running a Business  
To be able to consider all aspects of running a successful business, you'll need some basic knowledge and training on them.
Learning Resources: SBA.gov and Small Business Development Centers (SBDCs) offer beginner resources for business management.
Practice Tip: Study case studies on small business operations and identify essential operational processes. You can use generative AI to assist you.

We are glad to have you onboard :) If you have any questions, please contact teachers.`,
      },
      module2: {
        title: "AI for E-Commerce Planning",
        description:
          "Using AI tools to clarify handmade business ideas, perform market analysis, and create customer personas.",
        content: `# Smart learning plan (training)

Dear Oksana,

These recommendations are designed to support your preparation for module 2.

## Learning objectives

1. Clarify and Define Your Business Idea: Use AI tools to refine your concept of selling handmade accessories, focusing on unique selling points and target audience.
2. Conduct Competitor and Market Analysis: Utilize AI to analyze competitors in the fashion accessories market, identifying trends and gaps that your business can fill.
3. Create Customer Personas and Map Customer Journeys: Develop detailed customer personas for your target audience and outline their buying journey using AI tools to enhance your marketing strategy.
4. Analyze Customer Insights: Leverage AI-powered methods to gather and interpret customer insights, helping you make informed decisions about product offerings and marketing strategies.

## Assignments

## Business Idea Refinement:
* Use a generative AI tool (like ChatGPT) to brainstorm and refine your business idea.
* Prompt: "Help me define a unique selling proposition for my online store selling handmade accessories."
* Document the process and the ideas generated, explaining how they align with your passion for fashion.

## Market Analysis:
* Conduct a PESTEL analysis using AI tools to understand the external factors affecting the fashion accessories market in Estonia.
* Prompt: "What are the current trends and challenges in the fashion accessories market in Estonia?"
* Summarize your findings and reflect on how they can influence your business strategy.

## Customer Personas Creation:
* Create at least three customer personas using an AI tool to help visualize your target audience.
* Prompt: "Generate customer personas for an online store selling handmade jewelry and scarves."
* Present the personas and map out their customer journey from awareness to purchase.

## Customer Insights Analysis:
* Use AI to analyze social media trends related to fashion accessories, focusing on customer preferences and behaviors.
* Prompt: "What are the current customer preferences in the handmade accessories market based on social media trends?"
* Compile your insights and discuss how they can inform your product development and marketing strategies.

We hope these recommendations will help you prepare for module 2. If you have any questions, please contact your teachers.`,
      },
      module3: {
        title: "Business Prompting Workshop",
        description:
          "Apply structured prompts for handmade business impact and learn to assess AI tools.",
        content: `# Smart learning plan (training)

Dear Oksana,

These recommendations are designed to support your preparation for module 3.

## Learning objectives

1. Understand AI's role in compliance and legal issues: Learn how AI can help you navigate local regulations for your online business, especially in the fashion industry.
2. Assess AI tools for content creation: Explore various AI tools that can assist you in creating marketing materials for your handmade accessories.
3. Utilize structured prompts for business impact: Develop skills in crafting effective prompts that can generate valuable insights and content for your business.
4. Create a custom GPT for your business needs: Build a tailored AI model that can assist you in generating ideas, marketing content, and customer engagement strategies.

## Assignments

## AI Compliance Research:
Use an AI tool (like ChatGPT) to research local regulations for e-commerce in Estonia. Create a brief report summarizing key legal requirements for starting your online store. Include the prompts you used to gather this information.

## Marketing Material Creation:
Choose an AI content creation tool (such as Canva with AI features) to design a promotional post for your handmade accessories. Create a social media post that highlights your products and includes a catchy caption. Document the process and the prompts you used to generate ideas.

## Structured Prompt Development:
Create a list of structured prompts that you can use with AI tools to generate customer personas for your target audience. Test these prompts with an AI tool and refine them based on the output. Share your findings and how these personas can inform your marketing strategy.

## Custom GPT Development:
Use a platform like OpenAI to create a custom GPT that can help you brainstorm new accessory designs or marketing strategies. Document the setup process, including the system prompt and knowledge base you used, and reflect on how this tool can support your business planning.

We hope these recommendations will help you prepare for module 3. If you have any questions, please contact your teachers.`,
      },
      module4: {
        title: "AI for E-Commerce Success",
        description:
          "Use AI tools for strategic handmade accessories marketing and customer engagement.",
        content: `# Smart learning plan (training)

Dear Oksana,

These recommendations are designed to support your preparation for module 4.

## Learning objectives

* Develop a strategic marketing plan for your online store using AI tools.
  * Focus on identifying your target audience and creating tailored marketing strategies that resonate with them.
* Utilize AI-powered tools for customer engagement and service.
  * Learn how to implement chatbots and other AI tools to enhance customer interaction and support.
* Create a brand identity and marketing content that reflects your unique style.
  * Use AI to generate ideas for branding and content that align with your handmade accessories.
* Analyze market trends and customer feedback using AI analytics.
  * Gain insights into customer preferences and market dynamics to refine your business strategies.

## Assignments

## Assignment: Create a Marketing Campaign
* Use an AI tool like Canva or Adobe Spark to design a marketing campaign for your online store. Include visuals and copy that reflect your brand. Document the prompts you used to generate ideas and designs.

## Assignment: Implement a Chatbot for Customer Service
* Research and select a chatbot platform (e.g., ManyChat or Chatfuel) to create a simple chatbot for your online store. Outline the customer queries it will address and explain how you set it up, including any AI prompts used.

## Assignment: Develop Your Brand Identity
* Use an AI tool like Looka or Hatchful to create a logo and brand guidelines for your business. Describe the process you followed, including the prompts you used to generate design options.

## Assignment: Conduct Market Analysis with AI
* Utilize an AI tool like Google Trends or SEMrush to analyze current trends in the fashion accessories market. Summarize your findings and how they can inform your business decisions, detailing the steps and prompts you used in your analysis.

We hope these recommendations will help you prepare for module 4. If you have any questions, please contact your teachers.`,
      },
      module5: {
        title: "AI Hackathon Challenge",
        description:
          "Apply your AI skills in a collaborative hackathon to solve e-commerce business challenges.",
        content: `# AI Hackathon Challenge

Dear Oksana,

Congratulations on reaching the hackathon phase of our program! This is your opportunity to apply everything you've learned about AI to solve real business challenges related to your handmade accessories e-commerce venture.

## Hackathon Overview

The hackathon will take place over 48 hours, during which you'll work collaboratively to develop an AI-powered solution that addresses a specific challenge in the e-commerce industry. This is your chance to showcase your skills, creativity, and business acumen.

## Challenge Options

### 1. Visual Search and Product Discovery
Create an AI-powered visual search tool that allows customers to upload images of accessories they like and find similar items in your store, improving product discovery.

### 2. Dynamic Pricing and Inventory Management
Develop a system that uses AI to optimize pricing strategies and inventory management for handmade products, considering factors like materials cost, production time, and market demand.

### 3. Customer Personalization Engine
Build a personalization engine that delivers customized shopping experiences based on browsing history, purchase patterns, and style preferences to increase conversion rates.

## Preparation Tasks

### Research Phase:
* Identify and document the specific problem you want to solve within your chosen challenge area.
* Research existing solutions and identify gaps or opportunities for improvement.
* Define success metrics for your solution.

### Planning Phase:
* Outline the key components of your solution including which AI tools and technologies you'll use.
* Create a project plan for the hackathon, including tasks, responsibilities, and timelines.
* Prepare a list of data sources or requirements for your solution.

### Skills Assessment:
* Evaluate your team's current AI skills and identify any knowledge gaps.
* Complete tutorials or practice exercises on specific AI tools you plan to use during the hackathon.
* Prepare any templates or starter code that might help you work efficiently during the event.

We look forward to seeing your innovative solutions at the hackathon! This is a great opportunity to receive feedback from mentors and potential investors, so make the most of it.

If you have any questions, please contact the hackathon organizers.`,
      },
    },
  },
  {
    id_username: "ivan.tartu@example.com",
    modules: {
      module1: {
        title: "Understanding AI basics",
        description:
          "Learn fundamental technologies and ecosystems of AI and their relevance to IT service business.",
        content: `# Smart learning plan (onboarding)

Dear Ivan,

Thank you for participating in our Entrepreneurship Training Course! Below is your plan to build the foundational skills you currently rate as beginner.

## Essential learning topics and materials

## 1 Making a Business Plan  
To be able to make an effective business plan, you'll need some basic knowledge and training on them.
Learning Resources: Try HubSpot's free "Business Plan Template" and review tutorials on creating business plans on LinkedIn Learning.
Practice Tip: Draft a mini-business plan, focusing on basic sections such as vision, goals, target audience, and financial projections. You can use generative AI to assist you.

## 2 Running a Business  
To be able to consider all aspects of running a successful business, you'll need some basic knowledge and training on them.
Learning Resources: SBA.gov and Small Business Development Centers (SBDCs) offer beginner resources for business management.
Practice Tip: Study case studies on small business operations and identify essential operational processes. You can use generative AI to assist you.

## 3 Branding and Marketing  
To be able to start successfully marketing your business, products and services, you'll need some basic knowledge and training on marketing essentials.
Learning Resources: Coursera's "Marketing in a Digital World" or free Google Ads and Facebook Blueprint courses are great starting points.
Practice Tip: Develop a simple ad for a hypothetical product and run it on a small budget to understand basics in digital advertising. You can use generative AI to assist you.

We are glad to have you onboard :) If you have any questions, please contact teachers.`,
      },
      module2: {
        title: "AI for IT Business Planning",
        description:
          "Using AI tools to clarify IT service ideas, perform market analysis, and create customer personas.",
        content: `# Smart learning plan (training)

Dear Ivan,

These recommendations are designed to support your preparation for module 2.

## Learning objectives

* Define Your Business Idea Using AI: Utilize AI tools to clarify and refine your tech service firm concept, focusing on the specific IT solutions you plan to offer to small businesses in Estonia.
* Conduct Market Analysis with AI: Leverage AI for competitor analysis and market research to identify potential opportunities and challenges in the tech service sector.
* Create Customer Personas: Use AI to develop detailed customer personas that represent your target small business clients, including their needs, pain points, and decision-making processes.
* Analyze Customer Insights: Apply AI-powered methods to gather and analyze customer insights, helping you to better understand your audience and tailor your services accordingly.

## Assignments

## Business Idea Refinement:
* Use a generative AI tool (like ChatGPT) to brainstorm and refine your business idea.
* Prompt: "Help me define a tech service firm that provides cybersecurity and cloud services for small businesses in Estonia. What unique value can I offer?"
* Document the process and the final refined idea.

## Market Analysis:
* Conduct a PESTEL analysis using AI tools to assess the external factors affecting your business.
* Prompt: "Generate a PESTEL analysis for the tech service industry in Estonia, focusing on small businesses."
* Summarize the findings and identify at least three opportunities and challenges.

## Customer Personas Creation:
* Create at least three customer personas using an AI tool to help visualize your target audience.
* Prompt: "Create a customer persona for a small business owner in Estonia looking for IT solutions. Include demographics, needs, and pain points."
* Present the personas in a visual format (e.g., infographic).

## Customer Insights Analysis:
* Use AI to analyze customer feedback or reviews from similar businesses to gather insights.
* Prompt: "Analyze customer reviews for small IT service firms in Estonia and summarize key insights about customer needs and expectations."
* Write a brief report on the insights gained and how they can inform your business strategy.

We hope these recommendations will help you prepare for module 2. If you have any questions, please contact teachers.`,
      },
      module3: {
        title: "Business Prompting Workshop",
        description:
          "Apply structured prompts for IT business impact and learn to assess AI tools.",
        content: `# Smart learning plan (training)

Dear Ivan,

These recommendations are designed to support your preparation for module 3.

## Learning objectives

* Understand AI's role in compliance and legal issues for tech service firms: Explore how AI can help you navigate legal requirements and tax obligations specific to the IT industry in Estonia.
* Assess the reliability of AI tools for IT service delivery: Learn to evaluate different AI tools that can enhance your service offerings, focusing on cybersecurity and cloud services.
* Utilize content creation tools for marketing your tech services: Develop skills in creating engaging content that showcases your IT solutions to small businesses.
* Apply structured prompts to generate business insights: Practice using structured prompts to extract valuable information that can inform your business strategies and customer engagement.

## Assignments

## Compliance AI Research:
Research and summarize how AI tools can assist in compliance with legal and tax issues for tech service firms. Use a generative AI tool to create a brief report outlining key findings and the prompts you used to gather this information.

## AI Tool Evaluation:
Select two AI tools relevant to your business (e.g., for cybersecurity or cloud services). Compare their features, reliability, and potential impact on your service delivery. Document your findings in a presentation format, using AI to help design the slides and generate content.

## Content Creation for Marketing:
Use a generative AI tool to create a marketing flyer or social media post that promotes your future tech service firm. Focus on how your services can solve common problems for small businesses. Share the prompts you used and the rationale behind your content choices.

## Structured Prompting Exercise:
Create a set of structured prompts that you can use to gather insights about your target customers' needs and preferences. Use an AI tool to generate responses based on these prompts and analyze the results to inform your business planning.

We hope these recommendations will help you prepare for module 3. If you have any questions, please contact teachers.`,
      },
      module4: {
        title: "AI for IT Business Success",
        description:
          "Use AI tools for strategic IT service marketing and client engagement.",
        content: `# Smart learning plan (training)

Dear Ivan,

These recommendations are designed to support your preparation for module 4.

## Learning objectives

* Utilize AI tools for strategic brand planning: Develop a clear brand identity for your tech service firm that resonates with small businesses in Estonia, using AI to analyze market trends and customer preferences.
* Implement AI-powered customer engagement strategies: Explore how AI chatbots and automated customer service tools can enhance client interactions and support your business model.
* Leverage AI for marketing campaigns: Create targeted marketing campaigns using AI tools to reach small businesses effectively, focusing on your services like cybersecurity and cloud solutions.
* Apply future-thinking techniques with AI: Use AI to anticipate industry trends and customer needs, helping you to position your tech service firm strategically in the market.

## Assignments

## Brand Identity Creation:
Use an AI tool like Canva or Looka to design a logo and brand materials for your tech service firm. Document the prompts you used to generate ideas and the rationale behind your design choices.

## Chatbot Development:
Create a simple AI chatbot using a platform like Chatfuel or ManyChat. Outline the customer queries it can handle and explain how this tool can improve customer engagement for your business.

## Marketing Campaign Simulation:
Use an AI marketing tool like Mailchimp or HubSpot to design a mock email marketing campaign targeting small businesses. Include the AI-generated content and describe how you tailored it to meet the needs of your audience.

## Trend Analysis Report:
Utilize AI tools like Google Trends or BuzzSumo to analyze current trends in the tech service industry. Prepare a brief report on your findings, including potential opportunities for your business and how you plan to address them.

We hope these recommendations will help you prepare for module 4. If you have any questions, please contact your teachers.`,
      },
      module5: {
        title: "AI Hackathon Challenge",
        description:
          "Apply your AI skills in a collaborative hackathon to solve IT service business challenges.",
        content: `# AI Hackathon Challenge

Dear Ivan,

Congratulations on reaching the hackathon phase of our program! This is your opportunity to apply everything you've learned about AI to solve real business challenges related to your tech service firm.

## Hackathon Overview

The hackathon will take place over 48 hours, during which you'll work collaboratively to develop an AI-powered solution that addresses a specific challenge in the IT services industry. This is your chance to showcase your skills, creativity, and business acumen.

## Challenge Options

### 1. Automated Security Risk Assessment
Create an AI-powered tool that can automatically assess security vulnerabilities for small businesses and recommend appropriate cybersecurity measures based on their specific needs and risk profiles.

### 2. Smart IT Support System
Develop an intelligent support system that uses AI to diagnose common IT issues, provide automated solutions, and only escalate complex problems to human specialists, improving response times and reducing costs.

### 3. Predictive IT Maintenance
Build a solution that uses AI to predict potential IT infrastructure failures before they occur, allowing small businesses to address issues proactively and minimize downtime.

## Preparation Tasks

### Research Phase:
* Identify and document the specific problem you want to solve within your chosen challenge area.
* Research existing solutions and identify gaps or opportunities for improvement.
* Define success metrics for your solution.

### Planning Phase:
* Outline the key components of your solution including which AI tools and technologies you'll use.
* Create a project plan for the hackathon, including tasks, responsibilities, and timelines.
* Prepare a list of data sources or requirements for your solution.

### Skills Assessment:
* Evaluate your team's current AI skills and identify any knowledge gaps.
* Complete tutorials or practice exercises on specific AI tools you plan to use during the hackathon.
* Prepare any templates or starter code that might help you work efficiently during the event.

We look forward to seeing your innovative solutions at the hackathon! This is a great opportunity to receive feedback from mentors and potential investors, so make the most of it.

If you have any questions, please contact the hackathon organizers.`,
      },
    },
  },
  {
    id_username: "sophia.helsinki@example.com",
    modules: {
      module1: {
        title: "Understanding AI basics",
        description:
          "Master advanced AI technologies and their strategic application in business analytics platforms.",
        content: `# Smart learning plan (onboarding)

Dear Sophia,

Based on your survey responses, you already have a solid understanding of the core topics. This plan provides additional goals, exercises, and resources to help you improve further.

## 1. Advanced learning goals

Enhance AI Tool Proficiency: Deepen your understanding of advanced AI tools and their applications in business analytics, focusing on tools that cater specifically to European SMEs and GDPR compliance.

Market Adaptation Strategies: Develop strategies for adapting your AI-powered analytics platform to the Finnish and broader European market, considering local regulations, cultural nuances, and customer needs.

Networking and Collaboration: Build a framework for establishing connections with local entrepreneurs and potential collaborators, focusing on leveraging AI for networking and partnership opportunities.

## 2. Your tailored study plan

Research and Experimentation:
* Explore advanced features of AI tools like GPT models and business intelligence applications.
* Create a comparative analysis of at least three AI tools that can be integrated into your analytics platform, focusing on their strengths and weaknesses in the context of European SMEs.

Market Analysis:
* Conduct a detailed PESTEL analysis of the Finnish market, identifying key trends, opportunities, and challenges for your business idea.
* Develop customer personas specific to the European market, utilizing AI tools to gather insights and map customer journeys.

Networking Framework:
* Identify and list potential local networking events, online communities, and platforms where you can connect with other entrepreneurs in Finland.
* Create a strategy for engaging with these networks, including how to present your business idea and the value of your AI-powered analytics tool.

## 3. Extra assignments

## AI Tool Comparison Assignment:
* Select three AI tools relevant to your business analytics platform.
* Use generative AI to create a report comparing their features, usability, and compliance with GDPR. Document the prompts and tools you used in the process.

## Customer Persona Creation:
* Utilize AI to generate detailed customer personas for your target market in Europe.
* Explain the process, including the prompts used to gather data and insights, and how these personas will inform your business strategy.

## Networking Pitch Development:
* Create a pitch deck using AI tools that outlines your business idea, market analysis, and customer personas.
* Document the steps taken to create the pitch, including the prompts used for content generation and design.

## Future Trends Analysis:
* Use AI to analyze future trends in the European market that could impact your business.
* Summarize your findings and the AI tools used, detailing how these insights can shape your business strategy.

We are glad to have you onboard :) If you have any questions, please contact teachers.`,
      },
      module2: {
        title: "AI for Analytics Platform Planning",
        description:
          "Using AI tools for sophisticated market analysis, competitor assessment, and European SME customer personas.",
        content: `# Smart learning plan (training)

Dear Sophia,

These recommendations are designed to support your preparation for module 2.

## Learning objectives

* Clarify and Define Your Business Idea: Utilize AI tools to refine your AI-powered analytics platform concept, ensuring it aligns with European market needs and compliance requirements.
* Conduct Competitor and Market Analysis: Leverage AI for a comprehensive analysis of competitors in the European SME sector, identifying unique opportunities and challenges specific to your business model.
* Create Customer Personas and Map Customer Journeys: Develop detailed customer personas for your target market in Europe, using AI to map their journeys and enhance decision-making processes.
* Analyze Customer Insights: Use AI-powered methods to gather and analyze customer insights, focusing on privacy, GDPR compliance, and sustainability metrics relevant to your platform.

## Assignments

## Business Idea Refinement:
* Assignment: Use a generative AI tool (like ChatGPT) to brainstorm and refine your business idea. Create a prompt that asks the AI to suggest features and functionalities that would appeal to European SMEs. Document the process and the AI's suggestions.

## Market Analysis:
* Assignment: Conduct a PESTEL analysis of the European market using AI tools. Use a generative AI model to gather data on political, economic, social, technological, environmental, and legal factors affecting your industry. Summarize your findings and reflect on how they impact your business strategy.

## Customer Personas and Journeys:
* Assignment: Create at least three customer personas for your target audience in Europe using AI tools. Then, map out their customer journeys with the help of AI, identifying key touchpoints and pain points. Present your personas and journeys in a visually engaging format.

## Customer Insights Analysis:
* Assignment: Utilize AI to analyze customer feedback or survey data related to your business idea. Generate insights on customer preferences and behaviors, focusing on GDPR compliance. Write a brief report on your findings and how they will influence your business plan.

We hope these recommendations will help you prepare for module 2. If you have any questions, please contact your teachers.`,
      },
      module3: {
        title: "Business Prompting Workshop",
        description:
          "Apply advanced prompt engineering for business analytics insight generation and regulatory compliance.",
        content: `# Smart learning plan (training)

Dear Sophia,

These recommendations are designed to support your preparation for module 3.

## Learning objectives

* Understand AI's role in compliance with European legal and tax regulations: Explore how AI can assist in navigating the complexities of GDPR and other regulatory frameworks relevant to your AI-powered analytics platform.
* Assess the validity and reliability of AI tools for business applications: Evaluate various AI tools that can enhance your business operations, focusing on their effectiveness in the context of European SMEs.
* Utilize content creation tools to develop marketing materials for your platform: Create compelling business materials, such as a pitch deck and marketing content, that resonate with your target audience in Europe.
* Apply structured prompts to generate industry-specific insights and self-development resources: Develop prompts that can help you extract valuable insights from AI tools, tailored to the analytics needs of European SMEs.

## Assignments

## Compliance Analysis Assignment:
Research and summarize how AI tools can help ensure compliance with GDPR and other relevant regulations for your analytics platform. Use a generative AI tool to create a brief report outlining key compliance strategies, including prompts you used to gather information.

## AI Tool Evaluation:
Select three AI tools that you believe could enhance your business operations. Create a comparison chart that assesses their validity and reliability based on specific criteria (e.g., user reviews, case studies). Document the prompts you used to gather data on these tools.

## Pitch Deck Creation:
Use an AI content creation tool to design a pitch deck for your AI-powered analytics platform. Focus on how your platform addresses the needs of European SMEs. Share the process you followed, including the prompts used to generate content and visuals.

## Insight Generation Exercise:
Develop a set of structured prompts aimed at extracting insights related to market trends and customer needs in the European analytics space. Use an AI tool to generate a report based on these prompts, and reflect on how these insights can inform your business strategy.

We hope these recommendations will help you prepare for module 3. If you have any questions, please contact your teachers.`,
      },
      module4: {
        title: "AI for Analytics Platform Success",
        description:
          "Use AI tools for strategic platform positioning, European marketing, and sustainable business growth.",
        content: `# Smart learning plan (training)

Dear Sophia,

These recommendations are designed to support your preparation for module 4.

## Learning objectives

1. Strategic Brand Planning: Develop a comprehensive brand strategy for your AI-powered analytics platform that resonates with European SMEs, focusing on sustainability and GDPR compliance.
2. Marketing Campaign Development: Create a targeted marketing campaign using AI tools to effectively reach and engage your ideal customer personas in the European market.
3. Customer Engagement: Implement AI-powered chatbots or customer service tools to enhance user experience and engagement on your platform.
4. Future-Thinking Techniques: Utilize AI to analyze market trends and predict future needs of SMEs in Europe, ensuring your platform remains relevant and competitive.

## Assignments

## Brand Strategy Development:
* Assignment: Use a generative AI tool (like ChatGPT) to brainstorm and outline a brand strategy for your analytics platform. Include key messaging, value propositions, and sustainability metrics that align with European market expectations.
* Process: Document the prompts you used to generate ideas and the rationale behind your choices.

## Marketing Campaign Creation:
* Assignment: Design a marketing campaign using AI tools (e.g., Canva for visuals, GPT for copywriting) that targets your identified customer personas. Focus on how to communicate the unique benefits of your platform.
* Process: Share the AI tools and prompts you used to create campaign materials, and reflect on how they can be adapted for different market segments.

## Customer Engagement Implementation:
* Assignment: Develop a prototype of an AI-powered chatbot for your platform that addresses common customer queries and enhances user experience.
* Process: Explain the AI tools you used to create the chatbot, the prompts for training it, and how you plan to integrate it into your platform.

## Market Trend Analysis:
* Assignment: Conduct a trend analysis using AI tools (like Google Trends or a custom GPT) to identify emerging needs and challenges faced by SMEs in Europe.
* Process: Document the insights gained and the AI tools and prompts used in your analysis, and discuss how these insights will inform your platform's development.

We hope these recommendations will help you prepare for module 4. If you have any questions, please contact your teachers.`,
      },
      module5: {
        title: "AI Hackathon Challenge",
        description:
          "Apply your advanced AI skills in a collaborative hackathon to solve analytics platform business challenges.",
        content: `# AI Hackathon Challenge

Dear Sophia,

Congratulations on reaching the hackathon phase of our program! Given your advanced understanding of AI, this is an excellent opportunity to apply your expertise to solve complex business challenges related to your analytics platform.

## Hackathon Overview

The hackathon will take place over 48 hours, during which you'll work collaboratively to develop a cutting-edge AI-powered solution that addresses significant challenges in the business analytics space for European SMEs. This is your chance to showcase your innovation and technical acumen.

## Challenge Options

### 1. Explainable AI for Business Metrics
Create a solution that makes complex analytics more accessible to non-technical SME owners by developing explainable AI models that clarify how business recommendations are generated.

### 2. GDPR-Compliant Predictive Analytics
Develop a framework for predictive analytics that maintains full GDPR compliance while delivering valuable insights, addressing the specific privacy concerns of European businesses.

### 3. Cross-Language Business Intelligence
Build a system that analyzes business data across multiple European languages, providing consistent insights regardless of the language of the source documents or data.

## Preparation Tasks

### Research Phase:
* Conduct comprehensive research on the latest AI techniques relevant to your chosen challenge area.
* Analyze the most significant pain points for European SMEs when using analytics platforms.
* Define advanced success metrics and evaluation frameworks for your solution.

### Planning Phase:
* Design a scalable architecture for your solution incorporating state-of-the-art AI technologies.
* Create a detailed project plan with clear milestones and technical dependencies.
* Identify potential integration points with existing systems and data sources.

### Skills Assessment:
* Assess your team's advanced AI capabilities and assign roles based on technical strengths.
* Review recent research papers or cutting-edge approaches relevant to your solution.
* Prepare reusable components or APIs that can accelerate development during the hackathon.

We look forward to seeing your innovative solutions at the hackathon! Given your advanced knowledge, we encourage you to push boundaries and explore novel approaches. This is an excellent opportunity to receive feedback from industry experts and potential investors.

If you have any questions, please contact the hackathon organizers.`,
      },
    },
  },
  {
    id_username: "miguel.turku@example.com",
    modules: {
      module1: {
        title: "Understanding AI basics",
        description:
          "Learn fundamental technologies and ecosystems of AI and their relevance to café business.",
        content: `# Smart learning plan (onboarding)

Dear Miguel,

Thank you for participating in our Entrepreneurship Training Course! Below is your plan to build the foundational skills you currently rate as beginner.

## Essential learning topics and materials

## 1 Generative AI skills
To be able to utilize the commonly used generative AI tools, you will need some basic knowledge and training on them. 
Learning Resources: Explore materials on [Generative AI for Beginners](https://github.com/microsoft/generative-ai-for-beginners) and [Introduction to Generative AI](https://www.cloudskillsboost.google/course_templates/536). 
Practice Tip: Choose one generative AI service (ChatGPT, Copilot, Gemini or Claude), sign into its free version and familiarize yourself with creating content using AI.

## 2 Market Analysis and Customer Understanding
To be able to perform market analysis and utilize customer understanding, you'll need some basic knowledge and training on them. 
Learning Resources: Explore materials on consumer behavior and look into introductory YouTube tutorials on market analysis. 
Practice Tip: Choose a product or service that you commonly use, define its usual customers and report how and why are they using the product. Also find out about the competition for that product. You can use generative AI to assist you.

## 3 Creating and Testing Business Ideas
To be able to create and test business Ideas perform market analysis and utilize customer understanding, you'll need some basic knowledge and training on them. 
Learning Resources: Udemy's "Business Idea Creation" course or articles on the Lean Startup method can be useful.
Practice Tip: Develop and refine a simple business idea. Gather feedback from friends or online communities to start testing and iterating on the concept. You can use generative AI to assist you.

## 4 Making a Business Plan
To be able to make an effective business plan, you'll need some basic knowledge and training on them. 
Learning Resources: Try HubSpot's free "Business Plan Template" and review tutorials on creating business plans on LinkedIn Learning. 
Practice Tip: Draft a mini-business plan, focusing on basic sections such as vision, goals, target audience, and financial projections. You can use generative AI to assist you.

## 5 Running a Business
To be able to consider all aspects of running a successful business, you'll need some basic knowledge and training on them. 
Learning Resources: SBA.gov and Small Business Development Centers (SBDCs) offer beginner resources for business management. 
Practice Tip: Study case studies on small business operations and identify essential operational processes. You can use generative AI to assist you.

## 6 Branding and Marketing
To be able to start successfully marketing your business, products and services, you'll need some basic knowledge and training on marketing essentials. 
Learning Resources: Coursera's "Marketing in a Digital World" or free Google Ads and Facebook Blueprint courses are great starting points.
Practice Tip: Develop a simple ad for a hypothetical product and run it on a small budget to understand basics in digital advertising. You can use generative AI to assist you.

## 7 Sales and Customer Service
To be able to start closing deals, make effective sales efforts and provide successful customer service, you'll need some basic knowledge and training on marketing essentials. 
Learning Resources: HubSpot Academy has free courses on sales fundamentals and customer service.
Practice Tip: Practice a basic sales pitch or handle a mock customer inquiry to build confidence in communication and service skills. You can use generative AI to assist you.

## 8 Future-Thinking
To be able to anticipate trends, adapt to changes, and position your business for long-term success, you'll need some basic knowledge and training on strategic foresight and innovation management.
Learning Resources: Check out Future Today Institute's annual Tech Trends Report and take courses on futures thinking on platforms like FutureLearn or edX. 
Practice Tip: Identify emerging trends in your industry and create possible future scenarios for your business over the next 3-5 years. You can use generative AI to assist you in researching trends and developing scenarios.

We are glad to have you onboard :) If you have any questions, please contact teachers.`,
      },
      module2: {
        title: "AI for Café Business Planning",
        description:
          "Using AI tools to clarify fusion café ideas, perform market analysis, and create customer personas.",
        content: `# Smart learning plan (training)

Dear Miguel,

These recommendations are designed to support your preparation for module 2.

## Learning objectives

* Define Your Business Idea: Use AI tools to clarify and articulate your fusion café concept, focusing on how Brazilian flavors can be integrated with Finnish ingredients.
* Conduct Market Analysis: Utilize AI for competitor analysis in the food and beverage industry in Finland, identifying potential opportunities and challenges for your café.
* Create Customer Personas: Develop customer personas that reflect your target audience for the café, using AI to gather insights on customer preferences and behaviors.
* Refine Your Business Plan: Leverage AI tools to create a draft of your business plan, incorporating insights from your market analysis and customer personas.

## Assignments

## Business Idea Definition:
* Use a generative AI tool (like ChatGPT) to brainstorm and outline your café concept.
* Prompt: "Help me create a unique café concept that combines Brazilian flavors with Finnish ingredients. What dishes and drinks could I offer?"
* Document the process and the ideas generated.

## Market Analysis:
* Conduct a PESTEL analysis using AI to understand the external factors affecting the food and beverage industry in Finland.
* Prompt: "What are the political, economic, social, technological, environmental, and legal factors impacting the café industry in Finland?"
* Summarize your findings and reflect on how they relate to your business idea.

## Customer Personas:
* Use AI to create at least three customer personas for your café.
* Prompt: "Generate customer personas for a fusion café targeting young adults in Finland who enjoy trying new food experiences."
* Present the personas and explain how they will influence your business strategy.

## Business Plan Draft:
* Utilize a custom GPT tool to draft the first version of your business plan, incorporating insights from your previous assignments.
* Prompt: "Create a business plan outline for a fusion café that includes market analysis, customer personas, and a unique value proposition."
* Review and refine the draft based on feedback from peers or mentors.

We hope these recommendations will help you prepare for module 2. If you have any questions, please contact your teachers.`,
      },
      module3: {
        title: "Business Prompting Workshop",
        description:
          "Apply structured prompts for café business impact and learn to assess AI tools.",
        content: `# Smart learning plan (training)

Dear Miguel,

These recommendations are designed to support your preparation for module 3.

## Learning objectives

* Understand AI's role in legal compliance for the food and beverage industry: Learn how AI can assist in navigating Finnish regulations related to food safety, health standards, and business compliance.
* Assess the validity and reliability of AI tools for business applications: Develop skills to evaluate different AI tools that can help in customer service, marketing, and operational efficiency for your café.
* Utilize content creation tools to develop marketing materials for your fusion café: Gain hands-on experience in creating engaging content that reflects your unique business concept and appeals to your target audience.
* Apply structured prompts to generate business insights and self-development: Learn how to use AI to gather insights about customer preferences and trends in the food and beverage industry, which can inform your business strategy.

## Assignments

## Legal Compliance Research:
Use an AI tool (like ChatGPT) to research Finnish food safety regulations. Create a brief report summarizing key compliance requirements for starting a café. Include the prompts you used to gather this information.

## AI Tool Evaluation:
Identify two AI tools that can assist in customer service (e.g., chatbots) and marketing (e.g., social media content generators). Create a comparison chart detailing their features, pros, and cons. Document the process and prompts you used to gather this information.

## Marketing Material Creation:
Use a content creation tool (like Canva or an AI writing assistant) to design a promotional flyer for your fusion café. The flyer should highlight your unique offerings and target audience. Share the prompts and tools you used in the creation process.

## Customer Insights Generation:
Use an AI tool to analyze customer reviews or social media posts related to fusion cuisine. Summarize the insights you gather about customer preferences and trends. Explain the prompts you used to extract this information.

We hope these recommendations will help you prepare for module 3. If you have any questions, please contact your teachers.`,
      },
      module4: {
        title: "AI for Café Business Success",
        description:
          "Use AI tools for strategic café marketing and customer engagement.",
        content: `# Smart learning plan (training)

Dear Miguel,

These recommendations are designed to support your preparation for module 4.

## Learning objectives

1. Utilize AI tools for strategic brand planning: Learn how to create a unique brand identity for your fusion café that resonates with both Brazilian and Finnish cultures.
2. Develop marketing campaigns using AI: Understand how to design effective marketing strategies that leverage AI tools to reach your target audience in Finland.
3. Implement AI-powered customer engagement tools: Explore how chatbots and other AI tools can enhance customer service and engagement in your café.
4. Anticipate market trends using AI: Use AI to analyze market data and predict trends in the food and beverage industry, helping you to stay ahead of the competition.

## Assignments

## Brand Identity Creation:
* Use an AI tool like Canva or Looka to design a logo and branding materials for your fusion café.
* Document the prompts you used to generate ideas and the reasoning behind your design choices.

## Marketing Campaign Development:
* Create a simple marketing campaign using an AI tool like ChatGPT to generate social media posts and promotional content that highlights your café's unique offerings.
* Explain the process you followed, including the prompts used to generate content and how you tailored it to your target audience.

## Customer Engagement Simulation:
* Set up a basic chatbot using a platform like ManyChat or Chatfuel to simulate customer interactions for your café.
* Describe the scenarios you programmed into the chatbot and how it can enhance customer service.

## Market Trend Analysis:
* Use an AI tool like Google Trends or a market analysis tool to research current trends in the food and beverage industry in Finland.
* Summarize your findings and discuss how these trends could influence your business strategy.

We hope these recommendations will help you prepare for module 4. If you have any questions, please contact your teachers.`,
      },
      module5: {
        title: "AI Hackathon Challenge",
        description:
          "Apply your AI skills in a collaborative hackathon to solve café business challenges.",
        content: `# AI Hackathon Challenge

Dear Miguel,

Congratulations on reaching the hackathon phase of our program! This is your opportunity to apply everything you've learned about AI to solve real business challenges related to your fusion café venture.

## Hackathon Overview

The hackathon will take place over 48 hours, during which you'll work collaboratively to develop an AI-powered solution that addresses a specific challenge in the café industry. This is your chance to showcase your skills, creativity, and business acumen.

## Challenge Options

### 1. Smart Inventory and Waste Reduction
Create an AI system that optimizes inventory management by predicting ingredient usage based on historical data, weather forecasts, and local events to reduce waste and improve profitability.

### 2. Menu Innovation and Optimization
Develop a tool that uses AI to analyze customer preferences and feedback to suggest new Brazilian-Finnish fusion dishes or improvements to existing ones, considering both taste preferences and ingredient availability.

### 3. Customer Experience Personalization
Build a solution that recognizes regular customers and their preferences, enabling personalized recommendations and special offers to enhance customer loyalty and satisfaction.

## Preparation Tasks

### Research Phase:
* Identify and document the specific problem you want to solve within your chosen challenge area.
* Research existing solutions and identify gaps or opportunities for improvement.
* Define success metrics for your solution.

### Planning Phase:
* Outline the key components of your solution including which AI tools and technologies you'll use.
* Create a project plan for the hackathon, including tasks, responsibilities, and timelines.
* Prepare a list of data sources or requirements for your solution.

### Skills Assessment:
* Evaluate your team's current AI skills and identify any knowledge gaps.
* Complete tutorials or practice exercises on specific AI tools you plan to use during the hackathon.
* Prepare any templates or starter code that might help you work efficiently during the event.

We look forward to seeing your innovative solutions at the hackathon! This is a great opportunity to receive feedback from mentors and potential investors, so make the most of it.

If you have any questions, please contact the hackathon organizers.`,
      },
    },
  },
  {
    id_username: "default",
    modules: {
      module1: {
        title: "Understanding AI basics",
        description:
          "Learn fundamental technologies and ecosystems of AI and their relevance to business.",
        content: `# Introduction to AI for Business
  
  This module covers the essential foundations of AI technology and how it applies to business contexts.
  
  ## Key Topics
  - What is artificial intelligence?
  - Types of AI systems relevant to business
  - AI vs. traditional software approaches
  - Current state of AI capabilities`,
      },
      module2: {
        title: "AI for Business Planning",
        description:
          "Using AI tools to clarify business ideas, perform market analysis, and create customer personas.",
        content: `# Business Planning Fundamentals
  
  This module explores how AI tools can enhance the business planning process from ideation to execution.
  
  ## Key Topics
  - Market analysis with AI
  - Business model canvas development
  - Customer persona creation
  - Value proposition design`,
      },
      module3: {
        title: "Business Prompting Workshop",
        description:
          "Apply structured prompts for business impact and learn to assess AI tools.",
        content: `# Business Prompting Essentials
  
  This module teaches you how to effectively craft prompts for AI systems to achieve business objectives.
  
  ## Key Topics
  - Prompt engineering basics
  - Structure of effective business prompts
  - Common prompt patterns for business use cases
  - Testing and refining prompts`,
      },
      module4: {
        title: "AI for Business Success",
        description:
          "Use AI tools for strategic marketing and customer engagement.",
        content: `# Business Growth with AI
  
  This module focuses on leveraging AI for marketing, customer engagement, and business expansion.
  
  ## Key Topics
  - AI-driven marketing strategies
  - Customer engagement automation
  - Business analytics and insights
  - Scaling with AI tools`,
      },
      module5: {
        title: "AI Hackathon Challenge",
        description:
          "Apply your AI skills in a collaborative hackathon to solve real business challenges.",
        content: `# AI Hackathon Challenge
  
This module will test your ability to apply AI tools and knowledge in a practical business context.
  
## Hackathon Overview

The hackathon will take place over 48 hours, during which you'll work collaboratively to develop an AI-powered solution that addresses a specific business challenge. This is your chance to showcase your skills, creativity, and business acumen.

## Key Topics
- Identifying business problems suitable for AI solutions
- Rapid prototyping of AI-powered tools
- Collaborative development approaches
- Pitching and presenting AI solutions
- Implementation planning for business contexts

## Preparation Tasks

### Research Phase:
* Identify and document the specific problem you want to solve.
* Research existing solutions and identify gaps or opportunities for improvement.
* Define success metrics for your solution.

### Planning Phase:
* Outline the key components of your solution including which AI tools and technologies you'll use.
* Create a project plan for the hackathon, including tasks, responsibilities, and timelines.
* Prepare a list of data sources or requirements for your solution.

### Skills Assessment:
* Evaluate your current AI skills and identify any knowledge gaps.
* Complete tutorials or practice exercises on specific AI tools you plan to use during the hackathon.
* Prepare any templates or starter code that might help you work efficiently during the event.`,
      },
    },
  },
];

/**
 * Find module content for a specific user and module ID
 */
export function getModuleContent(
  email: string,
  moduleId: string
): ModuleContent {
  const userPlan =
    studyPlans.find((plan) => plan.id_username === email) ||
    studyPlans.find((plan) => plan.id_username === "default");

  const validModuleId = ["module1", "module2", "module3", "module4", "module5"].includes(
    moduleId
  )
    ? (moduleId as keyof StudyPlan["modules"])
    : ("module1" as keyof StudyPlan["modules"]);

  return userPlan!.modules[validModuleId];
}
