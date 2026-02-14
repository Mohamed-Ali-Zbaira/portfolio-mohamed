import { Bio } from './portfolioData';
import {
  LinkedinIcon,
  InstagramIcon,
  GithubIcon,
  TwitterIcon,
  FacebookIcon,
  getSocialIconComponent,
} from '../assets/components/FooterIcons';

// --- Données de Contenu du Footer ---
export const footerContent = {
  copyright: `\u00a9 ${new Date().getFullYear()} ${Bio.name}. All rights reserved.`,
  companyName: "Mohamed Ali Zbaira Portfolio",
};

export const socialLinks = [
  {
    iconName: 'Linkedin',
    href: Bio.linkedin,
    fallbackIcon: LinkedinIcon,
  },
  {
    iconName: 'Github',
    href: Bio.github,
    fallbackIcon: GithubIcon,
  },
  {
    iconName: 'Twitter',
    href: Bio.twitter,
    fallbackIcon: TwitterIcon,
  },
  {
    iconName: 'Instagram',
    href: Bio.insta,
    fallbackIcon: InstagramIcon,
  },
  {
    iconName: 'Facebook',
    href: Bio.facebook,
    fallbackIcon: FacebookIcon,
  },
];

// Réexporter getSocialIconComponent pour compatibilité avec les imports existants
export { getSocialIconComponent };