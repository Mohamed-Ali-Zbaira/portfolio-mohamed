import React from 'react';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

const MapPinIcon = ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>);
const MailIcon = ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v8a2 2 0 002 2h14a2 2 0 002-2v-8m-18 0l9 5.95M3 12a2 2 0 00-2 2v6a2 2 0 002 2h18a2 2 0 002-2v-6a2 2 0 00-2-2H3z"></path></svg>);
const PhoneIcon = ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.49 5.49l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-11a2 2 0 01-2-2v-11z"></path></svg>);
const ClockIcon = ({ className }) => (<svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>);

const lucideIcons = { MapPin, Mail, Phone, Clock };

export const getIconComponent = (info) => {
  return lucideIcons[info.iconName] || info.fallbackIcon;
};

export const contactInfoData = [
  {
    iconName: 'MapPin',
    title: 'Location',
    details: ['Sfax, Tunisia'],
    fallbackIcon: MapPinIcon,
  },
  {
    iconName: 'Mail',
    title: 'Email Address',
    details: ['Available on request'],
    fallbackIcon: MailIcon,
  },
  {
    iconName: 'Phone',
    title: 'Phone Number',
    details: ['Available on request'],
    fallbackIcon: PhoneIcon,
  },
  {
    iconName: 'Clock',
    title: 'Availability',
    details: ['Open to new opportunities'],
    fallbackIcon: ClockIcon,
  },
];

export const sectionTexts = {
  subtitle: 'Let\'s work together',
  title: 'Get In Touch',
  paragraph: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Feel free to reach out if you'd like to collaborate or have any questions about my work.",
  formTitle: 'Send me a message',
  submitButtonText: 'Send Message'
};

export const formPlaceholders = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Your Email Address',
    mobile: 'Your Mobile Number',
    message: 'Your Message'
};