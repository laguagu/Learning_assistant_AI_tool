// app/modules/[module_id]/page.tsx
import HomeButton from "@/components/home-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isModuleEnabled } from "@/lib/features";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// Define module content
const moduleContent = {
  module1: {
    title: "Understanding AI basics",
    description:
      "Learn fundamental technologies and ecosystems of AI and their relevance to business.",
    content: `
# Understanding AI Basics

## Introduction to Artificial Intelligence

Artificial Intelligence (AI) refers to systems or machines that mimic human intelligence to perform tasks and can iteratively improve themselves based on the information they collect. AI manifests itself in various forms:

- **Machine Learning**: Systems that can learn and improve from experience
- **Natural Language Processing**: The ability of computers to understand, interpret, and respond to human language
- **Computer Vision**: The ability to process and analyze visual information from the world
- **Robotics**: Machines that can perform tasks in the physical world

## Fundamental AI Technologies

### 1. Machine Learning

Machine learning is a subset of AI that focuses on building systems that learn from data. Key concepts include:

- **Supervised Learning**: Training a model on labeled data
- **Unsupervised Learning**: Finding patterns in unlabeled data
- **Reinforcement Learning**: Learning through trial and error with rewards and penalties

### 2. Neural Networks and Deep Learning

Neural networks are computing systems inspired by the human brain:

- **Artificial Neural Networks**: Interconnected nodes or "neurons" that process information
- **Deep Learning**: Neural networks with many layers that can learn complex patterns
- **Convolutional Neural Networks (CNNs)**: Specialized for image processing
- **Recurrent Neural Networks (RNNs)**: Designed for sequential data like text

### 3. Generative AI

Generative AI refers to AI systems that can create new content:

- **Large Language Models (LLMs)**: Systems like GPT-4 that can generate human-like text
- **Text-to-Image Models**: Systems like DALL-E that create images from text descriptions
- **Multimodal Models**: Systems that work with multiple types of data (text, images, audio)

## Business Applications of AI

### 1. Customer Service and Engagement

- **Chatbots and Virtual Assistants**: Automated customer service systems
- **Personalization**: Tailoring products and services to individual preferences

### 2. Process Automation

- **Robotic Process Automation (RPA)**: Automating repetitive tasks
- **Intelligent Document Processing**: Extracting information from documents

### 3. Data Analysis and Decision Making

- **Predictive Analytics**: Forecasting future trends
- **Business Intelligence**: Providing insights for decision making

## Ethical and Legal Considerations

### 1. Ethical Concerns

- **Bias and Fairness**: Ensuring AI systems don't discriminate
- **Privacy**: Protecting personal data used to train AI
- **Transparency**: Understanding how AI makes decisions

### 2. Legal Framework

- **Data Protection Laws**: GDPR, CCPA, and other regulations
- **Intellectual Property**: Ownership of AI-generated content
- **Liability**: Responsibility for AI actions and decisions

## Getting Started with AI Tools

### 1. Popular AI Tools and Platforms

- **OpenAI**: GPT models for text generation
- **Google AI**: Various AI tools and services
- **Microsoft Azure AI**: Cloud-based AI services
- **Hugging Face**: Open-source AI community

### 2. Basic Implementation Approaches

- **API Integration**: Using existing AI services through APIs
- **No-Code/Low-Code Solutions**: Tools that require minimal technical knowledge
- **Custom Development**: Building specialized AI solutions

## Conclusion

Understanding AI basics is essential for leveraging these technologies in business. By grasping the fundamental concepts, ethical considerations, and implementation approaches, you can begin to identify opportunities for AI in your industry.

## Next Steps

- Explore specific AI tools relevant to your business
- Identify processes that could benefit from AI
- Consider ethical implications for your specific use cases
    `,
  },
  module2: {
    title: "AI for Business Planning",
    description:
      "Using AI tools to clarify business ideas, perform market analysis, and create customer personas.",
    content: `
# AI for Business Planning

## Using AI to Define Business Ideas

### 1. Idea Generation and Refinement

Using AI tools to brainstorm and refine business concepts:

- **Problem identification**: Finding gaps in markets
- **Solution exploration**: Generating potential solutions
- **Concept validation**: Initial assessment of viability

### 2. Value Proposition Development

Crafting compelling value propositions with AI assistance:

- **Unique selling point identification**
- **Competitive advantage analysis**
- **Customer benefit articulation**

## Market and Competitor Analysis

### 1. Market Research with AI

Leveraging AI to gather and analyze market data:

- **Market size estimation**: Using data mining and predictive analytics
- **Trend identification**: Spotting emerging patterns and opportunities
- **Market segmentation**: Identifying distinct customer groups

### 2. Competitive Intelligence

Using AI to understand the competitive landscape:

- **Competitor identification**: Finding direct and indirect competitors
- **Competitive positioning analysis**: Understanding your place in the market
- **Gap analysis**: Identifying unmet needs and opportunities

## Customer Insights and Personas

### 1. Data-Driven Customer Personas

Creating detailed customer profiles using AI:

- **Demographic analysis**: Understanding who your customers are
- **Behavioral insights**: Learning how customers act and decide
- **Need identification**: Discovering what customers truly want

### 2. Customer Journey Mapping

Visualizing the customer experience with AI:

- **Touchpoint identification**: Mapping interactions with your business
- **Pain point discovery**: Finding friction in the customer journey
- **Opportunity spotting**: Identifying moments to delight customers

## Business Model Development

### 1. Revenue Model Analysis

Using AI to evaluate potential revenue streams:

- **Pricing strategy development**: Determining optimal price points
- **Revenue projection**: Forecasting potential income
- **Monetization option comparison**: Evaluating different approaches

### 2. Cost Structure Optimization

Leveraging AI for cost analysis:

- **Resource requirement estimation**: Calculating needed investments
- **Operational cost prediction**: Estimating ongoing expenses
- **Efficiency opportunity identification**: Finding ways to reduce costs

## Business Plan Creation

### 1. AI-Assisted Plan Writing

Using AI to draft comprehensive business plans:

- **Executive summary generation**: Creating concise overviews
- **Strategy articulation**: Clearly defining your approach
- **Financial projection assistance**: Building realistic models

### 2. Data Visualization and Presentation

Leveraging AI for impactful business plan presentation:

- **Chart and graph generation**: Visualizing key data
- **Presentation creation**: Building compelling slideshows
- **Document formatting**: Professional layout and design

## Risk Assessment and Contingency Planning

### 1. Risk Identification

Using AI to spot potential challenges:

- **Market risk analysis**: Understanding external threats
- **Operational risk assessment**: Identifying internal vulnerabilities
- **Financial risk evaluation**: Spotting potential financial pitfalls

### 2. Scenario Planning

Leveraging AI for future planning:

- **Alternative scenario generation**: Modeling different futures
- **Contingency strategy development**: Creating backup plans
- **Sensitivity analysis**: Testing how changes affect outcomes

## Conclusion

AI tools provide powerful capabilities for business planning, from initial idea development through detailed plan creation. By leveraging these technologies, entrepreneurs can make more informed decisions, identify opportunities more effectively, and create more resilient business models.

## Next Steps

- Select specific AI tools for your business planning process
- Gather the data you'll need to feed into these tools
- Begin with a focused area where AI can provide immediate value
    `,
  },
  module3: {
    title: "Business Prompting Workshop",
    description:
      "Apply structured prompts for business impact and learn to assess AI tools.",
    content: `
# Business Prompting Workshop

## Understanding Prompt Engineering

### 1. What is Prompt Engineering?

Prompt engineering is the practice of carefully designing inputs to get optimal outputs from AI systems:

- **Definition and importance**: The art of communicating effectively with AI
- **Evolution of prompting**: From simple commands to complex instructions
- **Role in business applications**: Why good prompts matter for results

### 2. Prompt Components and Structure

The anatomy of effective business prompts:

- **Context provision**: Setting the background for the AI
- **Instruction clarity**: Making requests specific and actionable
- **Format specification**: Defining how you want information presented
- **Examples inclusion**: Showing the AI what you want

## Prompting for Different Business Functions

### 1. Marketing and Sales Prompts

Crafting prompts for customer acquisition and revenue generation:

- **Ad copy generation**: Creating compelling advertisements
- **Sales script development**: Building conversation frameworks
- **Content marketing**: Producing blogs, social media, and other content
- **Campaign analysis**: Evaluating marketing performance

### 2. Operations and Management Prompts

Using prompts to improve business processes:

- **Process documentation**: Creating clear workflow instructions
- **Problem-solving frameworks**: Structured approaches to challenges
- **Decision support**: Getting insights for important choices
- **Project management**: Planning and tracking initiatives

### 3. Financial Planning Prompts

Leveraging AI for financial insights:

- **Budget creation**: Building financial plans
- **Financial analysis**: Understanding performance metrics
- **Forecasting**: Predicting future financial scenarios
- **Investment assessment**: Evaluating opportunities

## Advanced Prompting Techniques

### 1. Chain-of-Thought Prompting

Getting better reasoning from AI:

- **Step-by-step thinking**: Guiding the AI through logical steps
- **Reasoning demonstration**: Showing how to approach a problem
- **Inference verification**: Checking the AI's thinking process

### 2. Few-Shot and Zero-Shot Prompting

Working with examples in prompts:

- **Few-shot technique**: Providing examples to guide responses
- **Zero-shot approach**: Getting results without specific examples
- **Template creation**: Building reusable prompt frameworks

### 3. Role and Persona Prompting

Assigning specific perspectives to the AI:

- **Expert perspective**: Having the AI respond as a subject matter expert
- **Stakeholder viewpoint**: Seeing issues from different perspectives
- **Debate facilitation**: Getting multiple sides of an argument

## Evaluating Prompt Effectiveness

### 1. Quality Assessment Frameworks

Measuring prompt performance:

- **Relevance evaluation**: Does the output address the need?
- **Accuracy assessment**: Is the information correct?
- **Completeness check**: Does it cover everything needed?
- **Usefulness measurement**: Does it solve the business problem?

### 2. Iterative Prompt Refinement

Improving prompts through testing:

- **A/B testing approach**: Comparing different prompt versions
- **Feedback incorporation**: Learning from results
- **Prompt versioning**: Tracking changes and improvements

## Tool-Specific Prompting

### 1. LLM-Specific Strategies

Tailoring prompts to specific AI tools:

- **GPT model optimization**: Getting the best from OpenAI tools
- **Claude approach**: Effective prompting for Anthropic's Claude
- **Open-source model techniques**: Working with Llama, Mistral, etc.

### 2. Multimodal Prompting

Working with multiple types of data:

- **Text-to-image prompts**: Creating visual content
- **Combined text and image inputs**: Giving context with visuals
- **Data visualization requests**: Getting charts and graphs

## Business Use Case Library

### 1. Sample Prompts for Common Scenarios

Ready-to-use prompt templates:

- **Customer service responses**: Handling inquiries effectively
- **Market research queries**: Gathering competitive intelligence
- **Strategy development**: Building business plans
- **Communication drafting**: Creating emails, reports, and presentations

### 2. Use Case Development Workshop

Creating specific prompts for your business:

- **Need identification**: Determining where AI can help
- **Prompt drafting**: Creating initial versions
- **Testing and refinement**: Improving through iteration

## Ethical and Responsible Prompting

### 1. Avoiding Harmful Outputs

Ensuring safe and appropriate results:

- **Bias prevention**: Creating fair and balanced prompts
- **Harmful content avoidance**: Setting appropriate guardrails
- **Factuality emphasis**: Getting accurate information

### 2. Privacy and Data Security

Protecting sensitive information:

- **PII handling**: Keeping personal information safe
- **Proprietary data protection**: Guarding business secrets
- **Compliance considerations**: Meeting regulatory requirements

## Conclusion

Effective prompt engineering can dramatically improve the value you get from AI tools in business contexts. By understanding prompt structure, applying advanced techniques, and continuously refining your approach, you can leverage AI as a powerful business partner.

## Next Steps

- Create a prompt library for your specific business needs
- Establish a prompt testing and improvement process
- Share effective prompts across your organization
    `,
  },
  module4: {
    title: "AI for Business Success",
    description:
      "Use AI tools for strategic marketing and customer engagement.",
    content: `
# AI for Business Success

## Strategic AI Implementation

### 1. AI Strategy Development

Creating a comprehensive plan for AI adoption:

- **Opportunity identification**: Finding high-impact AI applications
- **Prioritization framework**: Deciding what to implement first
- **Resource allocation**: Determining necessary investments
- **Timeline planning**: Creating a realistic implementation schedule

### 2. Change Management for AI

Managing the organizational transition to AI-enhanced operations:

- **Stakeholder engagement**: Building buy-in across the organization
- **Communication planning**: Explaining the why and how of AI adoption
- **Training program development**: Preparing people for new tools
- **Cultural adaptation**: Fostering an AI-positive mindset

## AI-Powered Marketing

### 1. Content Creation and Management

Using AI to produce and optimize marketing materials:

- **Writing assistance**: Creating compelling copy
- **Image generation**: Producing visual content
- **Video development**: Building engaging multimedia
- **Content personalization**: Tailoring messages to specific audiences

### 2. Campaign Optimization

Leveraging AI for marketing performance:

- **A/B testing enhancement**: Comparing options more efficiently
- **Audience targeting**: Finding the right prospects
- **Channel optimization**: Determining the best platforms
- **Budget allocation**: Maximizing return on marketing spend

### 3. Customer Insights

Gaining deeper understanding through AI analysis:

- **Sentiment analysis**: Understanding customer feelings
- **Trend identification**: Spotting emerging patterns
- **Preference mapping**: Learning what customers value
- **Feedback processing**: Making sense of customer input

## AI in Sales and Revenue Generation

### 1. Lead Generation and Qualification

Finding and prioritizing prospects with AI:

- **Prospect identification**: Discovering potential customers
- **Lead scoring**: Determining which leads to pursue first
- **Contact enrichment**: Adding valuable prospect information
- **Outreach optimization**: Timing communications effectively

### 2. Sales Process Enhancement

Improving conversion with AI tools:

- **Conversation analysis**: Understanding effective selling approaches
- **Objection handling**: Preparing for customer concerns
- **Proposal generation**: Creating compelling offers
- **Follow-up optimization**: Maintaining momentum

### 3. Pricing and Revenue Optimization

Maximizing financial outcomes:

- **Dynamic pricing**: Adjusting prices based on factors like demand
- **Discount optimization**: Finding the right promotional approach
- **Bundle creation**: Putting together attractive offerings
- **Lifetime value prediction**: Understanding long-term customer worth

## AI for Customer Experience

### 1. Personalized Customer Journeys

Creating individualized experiences:

- **Customer segmentation**: Grouping similar customers
- **Next-best-action determination**: Deciding what to offer next
- **Custom recommendation**: Suggesting relevant products or content
- **Experience adaptation**: Changing based on customer preferences

### 2. Conversational AI Implementation

Leveraging AI for customer interaction:

- **Chatbot development**: Building effective digital assistants
- **Voice assistant integration**: Adding voice interfaces
- **Conversation design**: Creating natural interactions
- **Escalation management**: Knowing when to involve humans

### 3. Customer Service Enhancement

Improving support with AI:

- **Ticket classification**: Routing inquiries appropriately
- **Response suggestion**: Helping service agents
- **Knowledge base optimization**: Improving self-service resources
- **Service analytics**: Understanding performance metrics

## Data-Driven Decision Making

### 1. Business Intelligence with AI

Getting better insights from your data:

- **Automated reporting**: Creating regular performance updates
- **Anomaly detection**: Identifying unusual patterns
- **Causal analysis**: Understanding what drives outcomes
- **Visualization enhancement**: Making data more understandable

### 2. Predictive Analytics for Business

Looking ahead with AI-powered forecasting:

- **Demand forecasting**: Predicting future needs
- **Resource planning**: Preparing for coming requirements
- **Risk assessment**: Identifying potential issues
- **Opportunity prediction**: Spotting upcoming possibilities

## Innovation and Growth Through AI

### 1. AI-Driven Product Development

Creating new offerings with AI assistance:

- **Need identification**: Understanding unmet customer demands
- **Idea generation**: Brainstorming potential solutions
- **Prototype development**: Building initial versions
- **Iteration support**: Improving through testing

### 2. Business Model Innovation

Finding new ways to create value:

- **Business model analysis**: Understanding current approaches
- **Alternative exploration**: Discovering new possibilities
- **Competitive advantage identification**: Finding sustainable edges
- **Scenario planning**: Preparing for different futures

## Measuring AI Business Impact

### 1. ROI Calculation and Tracking

Determining the value of AI investments:

- **Cost tracking**: Understanding the full investment
- **Benefit quantification**: Measuring the gains
- **Timeline analysis**: Seeing when value materializes
- **Comparative assessment**: Weighing against alternatives

### 2. Performance Dashboards

Visualizing AI impact:

- **KPI identification**: Choosing the right metrics
- **Dashboard development**: Creating useful visualizations
- **Regular review process**: Maintaining oversight
- **Continuous improvement**: Using data to get better

## Building AI Capabilities

### 1. Talent and Skill Development

Preparing your team for AI success:

- **Skill gap analysis**: Understanding current capabilities
- **Training program development**: Building necessary knowledge
- **Role definition**: Clarifying AI-related responsibilities
- **Hiring strategy**: Finding the right talent

### 2. Tool Selection and Management

Choosing and implementing the right AI tools:

- **Requirements definition**: Understanding your needs
- **Vendor evaluation**: Assessing potential partners
- **Implementation planning**: Preparing for adoption
- **Ongoing management**: Maintaining and improving your tools

## Future-Proofing Your AI Strategy

### 1. Trend Monitoring

Staying ahead of AI developments:

- **Technology tracking**: Following key advancements
- **Competitive intelligence**: Understanding what others are doing
- **Research engagement**: Connecting with AI experts
- **Experimentation process**: Testing new capabilities

### 2. Ethical and Responsible AI

Building sustainable AI practices:

- **Ethical framework development**: Establishing guiding principles
- **Bias monitoring**: Ensuring fair outcomes
- **Transparency practices**: Making AI understandable
- **Compliance management**: Meeting regulatory requirements

## Conclusion

Successful AI implementation requires strategic thinking, careful implementation, and continuous improvement. By approaching AI as a business transformation tool rather than just a technology, organizations can achieve significant competitive advantages and create sustainable value.

## Next Steps

- Assess your current AI maturity and capabilities
- Identify specific high-impact AI opportunities
- Develop a phased implementation plan
- Begin building necessary skills and infrastructure
    `,
  },
};

interface ModulePageProps {
  params: {
    module_id: string;
  };
}

export default function ModulePage({ params }: ModulePageProps) {
  const { module_id } = params;

  // Extract module number from ID
  const moduleNumber = parseInt(module_id.replace("module", ""));

  // Check if module is enabled
  if (!isModuleEnabled(moduleNumber)) {
    redirect("/");
  }

  // Get module content
  const module = moduleContent[module_id as keyof typeof moduleContent];

  if (!module) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <HomeButton />

      <div className="mb-8 mt-12">
        <Link href="/users">
          <Button variant="outline" size="sm" className="mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
        </Link>

        <Card>
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  Module {moduleNumber}: {module.title}
                </CardTitle>
                <CardDescription className="mt-2">
                  {module.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="prose prose-headings:text-primary prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none py-8">
            <div dangerouslySetInnerHTML={{ __html: module.content }} />
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button asChild>
            <Link href="/users">Complete Module</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
