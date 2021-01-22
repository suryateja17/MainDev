import SOCIAL from '@salesforce/resourceUrl/SOCIAL'
import surya from '@salesforce/resourceUrl/surya';
export const PROFILE_IMAGE = surya

export const SOCIAL_LINKS=[
    {
        type: "facebook",
        label: "facebook/psuryateja17",
        link: "https://www.facebook.com/psuryateja17",
        icon: SOCIAL + '/SOCIAL/facebook.svg'
    },
    {
        type: "github",
        label: "github/suryateja17",
        link: "https://github.com/suryateja17",
        icon: SOCIAL + '/SOCIAL/github.svg'
    },
    {
        type: "linkedin",
        label: "linkedin/suryatejapothureddy",
        link: "https://www.linkedin.com/in/surya-teja-pothureddy-1b7b4a130.com/in/",
        icon: SOCIAL + '/SOCIAL/linkedin.svg'
    },
    {
        type: "trailhead",
        label: "trailhead/steja3",
        link: "https://trailblazer.me/id/steja3",
        icon: SOCIAL + '/SOCIAL/trailhead.svg'
    }
]

export const USER_DETAILS={
    NAME:'Surya Teja Pothureddy',
    ROLE:'Salesforce Developer',
    EMAIL:'psuryateja17@gmail.com',
    PHONE:'+44-7405187659'
}

export const CAREER_SUMMARY={
    HEADING:"CAREER SUMMARY",
    DESCRIPTION: "I am a dedicated and hardworking Salesforce Developer with an innate desire to learn, excel and deliver high quality solutions on time. I am always looking for new and challenging tasks to enhance my current skills on the Force.com platform. Blessed with excellent communication skills and leadership skills, I thrive in a team environment and build solid long lasting relationships with my peers and superiors alike. I have 6 years of total experience in Salesforce development where i had the opportunity to design and implement various high performance and user friendly applications on the Force.com platform.",
    KEYS_POINTS:[
        "3x Salesforce certified. ",
        "Implemented numerous end to end features for orgs with 1000+ users.",
        "keypoin t 3 Lorem Ips um is simply dummy text of the printing and typesetting industry.",
        "keypoint 4 Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    ]
}

export const EXPERIENCE_DATA={
    HEADING: "Work Experience",
    EXPERIENCES: [
        {
            ROLE: "Senior Salesforce Developer",
            COMPANY_NAME: "Cisco Meraki",
            DURATION: "Jun 2020 - Present",
            DESCRIPTION:
                "Currently working in the capacity of a senior salesforce developer for Meraki's SFDC orgs and also dabble on their dashboad technologies as a full stack developer.",
            DESCRIPTION_POINTS: [
                "Create and support high performance, scalable and efficient apps on the salesforce platform",
                "Help support the business systems team on thier quest to stay the as #1 cloud managed networks",
                "Support and fix production issues as and when they arise",
                "Help design and architect new solutions on the SFDC platform and beyond as the team rapidly expands",
            ],
            TECHNOLOGIES_USED: {
                HEADING: 'Technologies used',
                LIST: [
                    "Apex",
                    "Javascript",
                    "Lightning Web Components",
                    "Ruby On Rails",
                    "HTML5/CSS",
                    "MySQL",
                    "VisualForce"
                ]
            },
        },
        {
            ROLE: "Senior Software Developer",
            COMPANY_NAME: "Facebook",
            DURATION: "2014 - 2018",
            DESCRIPTION:
                "Your Job description goes here iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ",
            DESCRIPTION_POINTS: [
                " You description Points 1 goes here. consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
                "You description Points 2 et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis",
                "You description Points 3 et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis",
                "You description Points 4 et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis",
            ],
            TECHNOLOGIES_USED: {
                HEADING: 'Technologies used',
                LIST: [
                    "React",
                    "Nodejs",
                    "Express",
                    "Rollup",
                    "HTML5/CSS3",
                    "SQL",
                ]
            }
        },
        {
            ROLE: "Software Developer",
            COMPANY_NAME: "AMAZON",
            DURATION: "2012 - 2014",
            DESCRIPTION:
                "Your Job description goes hereiusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ",
            DESCRIPTION_POINTS: [
                " You description Points 1 goes here. consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
                "You description Points 2 et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis",
                "You description Points 3 et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis",
                "You description Points 4 et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis",
            ],
            TECHNOLOGIES_USED: {
                HEADING: 'Technologies used',
                LIST: [
                    "Angular",
                    "Bootstsrap",
                    "MobX",
                    "Webpack",
                    "HTML5/CSS3",
                    "Javascript",
                ]
            }
        },
        {
            ROLE: "Web Developer Trainee",
            COMPANY_NAME: "Microsoft",
            DURATION: "2011 - 2012",
            DESCRIPTION:
                "Your Job description goes hereiusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. ",
            DESCRIPTION_POINTS: [
                " You description Points 1 goes here. consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
                "You description Points 2 et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis",
                "You description Points 3 et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis",
                "You description Points 4 et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis",
            ],
            TECHNOLOGIES_USED: {
                HEADING: 'Technologies used',
                LIST: [
                    "HTML5",
                    "CSS3",
                    "Javascript",
                    "jQuery",
                    "java",
                    "SQL",
                ]
            }
        },
    ]
}


 export const EDUCATION_DATA={
     ICON: SOCIAL + '/SOCIAL/education.svg',
     HEADING: "EDUCATION",
     LIST:[
         {
             NAME: "Master in Computer science",
             UNIVERSITY_NAME: "Monash University Melbourne",
             DURATION: "2009 - 2011",
         },
         {
             NAME: "Bachelor in Computer Science",
             UNIVERSITY_NAME: "RMIT University Melbourne",
             DURATION: "2006 - 2009",
         }
     ]
 }

 export const AWARDS_DATA={
     ICON: SOCIAL + '/SOCIAL/awards.svg',
     HEADING: "AWARDS",
     LIST: [
         {
             NAME: "Microsoft MVP",
             DESCRIPTION:"Award description goes here, sem. Nulla consequat massa quis enim. Donec pede justo.",
         },
         {
             NAME: "Employee of the year",
             DESCRIPTION:"Award description goes here, sem. Nulla consequat massa quis enim. Donec pede justo.",
         },
     ]
 }

export const CERTIFICATION_DATA={
    ICON: SOCIAL + '/SOCIAL/certification.svg',
    HEADING: "CERTIFICATIONS",
    LIST: [
        {
            NAME: "Salesforce Administrator",
        },
        {
            NAME: "Salesforce JavaScript Dev 1",
        },
        {
            NAME: "Salesforce JavaScript Dev 1",
        },
        {
            NAME: "Salesforce Platform App Builder",
        },
        {
            NAME: "Salesforce Einstein",
        }
    ]
}

export const LANGUAGES_DATA={
    HEADING: "Languages",
    LIST: [
        {
            NAME: "English",
            LEVEL: "Native",
        },
        {
            NAME: "German",
            LEVEL: "Professional",
        },
        {
            NAME: "Spanish",
            LEVEL: "Professional",
        },
    ]
}

export const SKILLS_DATA ={
    HEADING: "SKILLS & TOOLS",
    SKILLS:[
        {
            HEADING: "FRONTEND",
            SKILLS_LIST: [
                { NAME: "React", LEVEL: "95" },
                { NAME: "Vue", LEVEL: "80" },
                { NAME: "Angular", LEVEL: "75" },
                { NAME: "JavaScript(ES5/ES6/ES7/ES8)", LEVEL: "89" },
                { NAME: "HTML5/CSS3/SASS/LESS", LEVEL: "90" },
            ],
        },
        {
            HEADING: "BACKEND",
            SKILLS_LIST: [
                { NAME: "Python/Django", LEVEL: "80" },
                { NAME: "NodeJs", LEVEL: "95" },
                { NAME: "PHP", LEVEL: "98" },
            ],
        },
        {
            HEADING: "CRM/CMS",
            SKILLS_LIST: [
                { NAME: "Salesforce", LEVEL: "50" },
                { NAME: "Wordpress", LEVEL: "75" },
                { NAME: "Drupal", LEVEL: "60" },
            ],
        }
    ],
    OTHERS_SKILLS:{
        HEADING: 'OTHERS',
        SKILLS_LIST: [
            "Git",
            "Gulp",
            "Webpack",
            "Code Review",
            "JIRA",
            "ngnix",
            "Unit Testing",
            "Google Api",
            "Sketch",
            "Jest",
            "firebase",
            "Confluence"]
    }
}

export const INTERESTS_DATA = {
    HEADING: "Interests",
    LIST: ["Reading", "Cooking", "Cricket"]
}