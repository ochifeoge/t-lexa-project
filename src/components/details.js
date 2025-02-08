import { FaUserCircle, FaShoppingBag, FaEnvelope } from "react-icons/fa";
const baseUrl = import.meta.env.BASE_URL;

export const navlinks = [
  { href: "/", label: "home" },
  { href: "/shop", label: "shop" },
  { href: "/about", label: "about us" },
  { href: "/contact", label: "contact" },
  { href: "/blog", label: "blog" },
];

export const heroVid = baseUrl + "/assets/videos/herovideo.mp4";
export const heroPic = baseUrl + "/assets/images/heropic.jpg";
export const nikeShirt1 = baseUrl + "/assets/images/nikeShirt1.png";
export const pay = baseUrl + "/assets/images/pay.png";

export const tovia = baseUrl + "/assets/images/tovia.jpg";
export const contactUs = baseUrl + "/assets/images/contact us.jpg";
export const productHero = baseUrl + "/assets/images/shopproduct.jpg";

export const apprasials = [
  {
    img: "aminu.jpeg",
    link: "https://www.linkedin.com/in/aminu-ibrahim-garkida-43246a111?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BdCqCMNW9TGiGnYcVnfqAXQ%3D%3D",
    name: "Aminu Ibrahim Garkida",
    title:
      "Well Engineer | Project Engineer | Financial Analysis | Assets Management",
    comment: `It is my distinct pleasure to wholeheartedly recommend Felicia
                    
                      Atamba field locations, and throughout our time together,
                    .`,
  },
  {
    img: "ubong.jpeg",
    link: "https://www.linkedin.com/in/ubong-udofia-beng-stanford-certified-project-manager-4399532b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3Bzik3%2F0VzS92QUzYs4zig5Q%3D%3D",
    name: "Ubong Udofia",
    title: "Stanford Certified Project Manager and Well Engineering Lead",
    comment: `It's my pleasure to recommend Ms. Felicia Fred based on our
                    
                      makes her a valuable asset to any organization. I
                      wholeheartedly recommend Ms. Felicia Fred for any role where
                      excellence in HSE management is required.`,
  },
  {
    img: "ekemena.jpeg",
    link: "https://www.linkedin.com/in/omoghagha-ekemena-850b0187?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BevDFghBpT%2ByarNV59zwpFg%3D%3D",
    name: "Omoghagha Ekemena",
    title:
      "MASSP| NEBOSH IGC| ISO 14001;Lead Auditor| ISO 45001; OHS Lead Auditor| IOSH Managing Safely|",
    comment: `I had the pleasure of working closely with Felicia Fred on
                      various complex 
                      witnessing her continued contributions to the field.`,
  },

  {
    img: "jubril.jpg",
    link: "https://www.linkedin.com/in/adewale-jubril-1b7776269?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BH63eBeg4T%2Fendp8XsLsa8w%3D%3D",
    name: "Adewale (ADEBOWALE) Jubril",
    title:
      "Aspiring Instrumtlways willing to lend a helping hand to her colleagues. Her positive attitude and strong interpersonal skills make her a pleasure to work with and a respected member of our team.",
  },
];

export const menuItems = [
  {
    icon: FaUserCircle,
    title: "My Profile",
    link: "/profile",
  },
  {
    icon: FaUserCircle,
    title: "Edit Profile",
    link: "/edit-profile",
  },
  {
    icon: FaShoppingBag,
    title: "My Orders",
    link: "/orders",
  },
  {
    icon: FaEnvelope,
    title: "Inbox",
    link: "/inbox",
  },
];
