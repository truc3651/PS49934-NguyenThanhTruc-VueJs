const now = Date.now()
const day = 24 * 60 * 60 * 1000

export const mockPosts = [
  {
    id: 1,
    title: 'Renewable Energy Surpasses Coal for First Time in History',
    content: 'In a historic milestone for the global energy transition, renewable energy sources have provided more than a third of global electricity in 2025, overtaking coal for the first time ever. This breakthrough marks a significant turning point in the fight against climate change. Solar and wind power have seen unprecedented growth, with installations doubling in many countries. Experts say this trend is expected to accelerate as battery storage technology improves and costs continue to fall. The shift represents not just an environmental victory but also an economic one, as renewable energy jobs now outnumber those in fossil fuels.',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    authorId: 1,
    createdAt: now - 1 * day,
    updatedAt: now - 1 * day
  },
  {
    id: 2,
    title: 'AI Revolution: How Agentic AI is Transforming Business Decisions',
    content: 'Agentic AI systems are set to handle 15% of all business decisions by 2028, according to leading technology analysts. Unlike traditional AI that requires human prompting, agentic AI can autonomously plan, execute, and adapt to complete complex tasks. Companies across industries are already implementing these systems for customer service, supply chain management, and strategic planning. While the technology promises unprecedented efficiency gains, experts also warn about the need for proper governance frameworks to ensure these autonomous systems align with human values and organizational goals.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    authorId: 1,
    createdAt: now - 2 * day,
    updatedAt: now - 2 * day
  },
  {
    id: 3,
    title: 'Arctic Winter Temperatures Reach Alarming Levels',
    content: 'Scientists are raising alarms as winter temperatures at the North Pole reached more than 20 degrees Celsius above the 1991-2020 average in early 2025. This unprecedented warming has crossed the threshold for ice to melt even during winter months. The rapid changes in the Arctic are affecting weather patterns globally, contributing to extreme weather events across continents. Climate researchers warn that at current emission rates, the remaining carbon budget to meet the 1.5C target has just two years left. The data underscores the urgent need for immediate and substantial reductions in greenhouse gas emissions.',
    image: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=800',
    authorId: 1,
    createdAt: now - 3 * day,
    updatedAt: now - 3 * day
  },
  {
    id: 4,
    title: 'Green Concrete Technology Could Slash Construction Emissions',
    content: 'A revolutionary new cement-free green concrete technology is poised to transform the construction industry. Traditional Portland cement manufacturing currently contributes around 8% of global CO2 emissions, making it one of the largest industrial sources of greenhouse gases. The new technology eliminates Portland cement altogether, using alternative binding materials that can be produced with a fraction of the carbon footprint. Early adopters in the construction industry report that the green concrete performs comparably to traditional materials while offering significant sustainability benefits. This innovation could be crucial in achieving net-zero targets in the built environment.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    authorId: 1,
    createdAt: now - 4 * day,
    updatedAt: now - 4 * day
  },
  {
    id: 5,
    title: 'Aviation Industry Unveils Plan to Halve Emissions Without Cutting Flights',
    content: 'New analysis reveals that climate-heating emissions from aviation could be slashed in half without reducing the number of passenger journeys. The comprehensive study examines a combination of sustainable aviation fuels, improved aircraft efficiency, optimized flight routes, and operational changes. Airlines are already investing billions in next-generation aircraft designs and biofuel production facilities. The findings offer hope that the growing demand for air travel can be reconciled with climate goals. However, experts caution that achieving these reductions will require coordinated action from governments, airlines, and fuel producers.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    authorId: 1,
    createdAt: now - 5 * day,
    updatedAt: now - 5 * day
  },
  {
    id: 6,
    title: 'Satellite Technology Enables Precise Tracking of Fossil Fuel Emissions',
    content: 'A groundbreaking satellite-based method now allows scientists to track fossil fuel CO2 emissions with greater precision than ever before. This significant advancement for climate monitoring enables real-time verification of emission reports from industrial facilities and entire countries. The technology uses advanced spectroscopy to distinguish between natural and human-caused carbon dioxide in the atmosphere. Environmental groups are calling this a game-changer for climate accountability, as it becomes much harder for polluters to underreport their emissions. The data is already being used to inform policy decisions at international climate negotiations.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
    authorId: 1,
    createdAt: now - 6 * day,
    updatedAt: now - 6 * day
  },
  {
    id: 7,
    title: 'The Guardian Launches Major Digital Redesign for Mobile-First Era',
    content: 'Facing the existential threat of AI-generated content, The Guardian newspaper has launched a comprehensive redesign focused on flexibility and mobile-first design. The new features include a less overwhelming homepage with curated highlights, a redesigned My Guardian tab for following topics and writers, and a dedicated podcasts tab. Perhaps most notably, all articles can now be listened to through an enhanced text-to-speech facility. The redesign represents the newspapers commitment to quality journalism in an era of information overload, providing readers with tools to cut through the noise and access trusted, in-depth reporting.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
    authorId: 1,
    createdAt: now - 7 * day,
    updatedAt: now - 7 * day
  },
  {
    id: 8,
    title: 'Food Waste Upcycling: Automated Systems Turn Trash into Treasure',
    content: 'Innovative automated food waste upcycling systems are emerging as a promising solution to both food waste and resource scarcity. These technologies can process discarded food from restaurants, supermarkets, and households, converting it into valuable products like animal feed, biofuels, and even new food ingredients. The systems use AI to sort and process different types of organic waste efficiently. Cities implementing these technologies report significant reductions in landfill waste while creating new revenue streams. The approach exemplifies the circular economy in action, turning what was once garbage into a valuable resource.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800',
    authorId: 1,
    createdAt: now - 8 * day,
    updatedAt: now - 8 * day
  },
  {
    id: 9,
    title: 'AI-Powered Earth Observation Transforms Environmental Monitoring',
    content: 'Artificial intelligence combined with satellite Earth observation is revolutionizing how we monitor and protect our planet. These systems can now detect deforestation in near real-time, track wildlife populations, monitor ocean health, and identify illegal fishing activities. The technology processes vast amounts of satellite imagery that would take humans years to analyze, providing actionable insights within hours. Conservation organizations are using these tools to respond more quickly to environmental threats, while governments employ them for enforcing environmental regulations. The convergence of AI and space technology offers new hope for protecting biodiversity.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    authorId: 1,
    createdAt: now - 9 * day,
    updatedAt: now - 9 * day
  },
  {
    id: 10,
    title: 'Wimbledon 2025: New Era Begins as Young Stars Shine',
    content: 'The 2025 Wimbledon Championships have opened with thrilling matches as a new generation of tennis stars takes center stage. Defending champions faced stiff competition from emerging talents, with several surprising early-round results. The grass court season has showcased the evolution of modern tennis, with players combining traditional net play with powerful baseline games. Attendance at the All England Club has reached record levels, demonstrating the enduring appeal of the worlds oldest and most prestigious tennis tournament. The tournament continues to innovate while preserving its cherished traditions.',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800',
    authorId: 1,
    createdAt: now - 10 * day,
    updatedAt: now - 10 * day
  },
  {
    id: 11,
    title: 'Secure Messaging: How News Organizations Protect Their Sources',
    content: 'In an era of increasing digital surveillance, major news organizations are implementing cutting-edge secure messaging systems to protect journalistic sources. The Guardian, in collaboration with the University of Cambridge, has integrated a secure messaging feature directly into its mobile app, allowing sources to communicate safely with journalists. These encrypted channels are crucial for investigative journalism, enabling whistleblowers and insiders to share information without fear of exposure. The technology represents a new standard in source protection, acknowledging that press freedom depends on the ability to receive confidential information securely.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    authorId: 1,
    createdAt: now - 11 * day,
    updatedAt: now - 11 * day
  },
  {
    id: 12,
    title: 'Guardian Agents: The Future of AI Safety and Governance',
    content: 'As AI systems become more autonomous, a new category of Guardian Agents is emerging to ensure these technologies remain safe and aligned with human values. Industry analysts predict that guardian agents will capture 10-15% of the agentic AI market by 2030. These specialized AI systems monitor and regulate other AI, checking for errors, biases, and potentially harmful outputs. The development reflects growing recognition that as AI capabilities increase, so too must our mechanisms for oversight and control. Companies and governments are investing heavily in this technology as part of comprehensive AI governance strategies.',
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
    authorId: 1,
    createdAt: now - 12 * day,
    updatedAt: now - 12 * day
  }
]
