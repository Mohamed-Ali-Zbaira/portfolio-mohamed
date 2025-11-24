// src/sections/ContactSection.jsx
import React, { useState, useRef } from 'react';
import { getIconComponent } from "../../data/DataContactSection.jsx";
import { useTranslation } from '../../hooks/useTranslation';

const InfoCard = ({ info }) => {
  const IconComponent = getIconComponent(info);
  const isEmail = info.iconName === 'Mail';

  return (
    <div className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white">
      <div className="flex justify-start mb-4">
        <IconComponent className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
      {info.details.map((detail, index) => (
        <p key={index} className="text-gray-600 text-sm leading-relaxed">
          {isEmail ? (
            <a
              href={`mailto:${detail}`}
              className="text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline transition font-medium"
            >
              {detail}
            </a>
          ) : (
            detail
          )}
        </p>
      ))}
    </div>
  );
};

export const ContactSection = () => {
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const formRef = useRef(null);

  // EmailJS Keys – Ne touche plus jamais ça
  const SERVICE_ID = "service_fed3kcd";
  const TEMPLATE_ID = "template_bsd6mej";
  const PUBLIC_KEY = "oR8heRtBIy-rhESej";

  // Seulement 3 cartes : Location + Email (cliquable) + Availability
  const contactInfoData = [
    { iconName: 'MapPin', title: t.contact.location, details: [t.contact.locationValue] },
    { 
      iconName: 'Mail', 
      title: t.contact.emailAddress, 
      details: ["dev.mohamedalizbaira@gmail.com"]  // Email codé en dur + cliquable grâce à InfoCard
    },
    { iconName: 'Clock',  title: t.contact.availability, details: [t.contact.availabilityValue] },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatusMessage(null);

    const form = formRef.current;

    const formattedTime = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    const templateParams = {
      from_first_name: form.from_first_name.value.trim(),
      from_last_name: form.from_last_name.value.trim(),
      from_email: form.from_email.value.trim(),
      from_mobile: form.from_mobile?.value.trim() || 'Not provided',
      message: form.message.value.trim(),
      current_time: formattedTime,
      reply_to: form.from_email.value.trim(),
    };

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: templateParams,
        }),
      });

      if (!response.ok) throw new Error('Failed to send');

      const text = await response.text();
      if (text === 'OK') {
        setStatusMessage('success');
        form.reset();
      } else {
        throw new Error('Unexpected response');
      }
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatusMessage('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="lg:flex lg:gap-16 items-start">

          {/* Left Column */}
          <div className="lg:w-2/5 mb-10 lg:mb-0 pt-10 lg:pt-0">
            <h3 className="text-xl font-semibold text-gray-400 flex items-center mb-2">
              <span className="text-blue-400 mr-2">/</span> {t.contact.subtitle}
            </h3>
            <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6">
              {t.contact.title}
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg max-w-md">
              {t.contact.description}
            </p>
          </div>

          {/* Form Column */}
          <div className="lg:w-3/5">
            <div className="bg-gray-100 p-8 md:p-12 rounded-xl shadow-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {t.contact.formTitle}
              </h3>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">

                <div className="flex gap-4">
                  <input type="text" name="from_first_name" placeholder={t.contact.firstName} className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" required />
                  <input type="text" name="from_last_name" placeholder={t.contact.lastName} className="w-1/2 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" required />
                </div>

                <input type="email" name="from_email" placeholder={t.contact.email} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" required />
                <input type="tel" name="from_mobile" placeholder={t.contact.mobile} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" />
                <textarea name="message" placeholder={t.contact.message} rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition" required></textarea>

                <div className="text-center pt-2">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-8 py-3 text-lg font-semibold text-white bg-gray-900 rounded-lg shadow-xl hover:bg-gray-700 transition duration-300 uppercase tracking-widest disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSending ? 'Sending...' : t.contact.sendMessage}
                  </button>
                </div>

                {/* Success / Error Message */}
                {statusMessage && (
                  <div className={`text-center mt-6 p-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                    statusMessage === 'success'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}>
                    {statusMessage === 'success'
                      ? t.contact.successMessage || "Your message has been sent successfully! I will reply soon."
                      : t.contact.errorMessage || "Failed to send the message. Please try again later."
                    }
                  </div>
                )}

              </form>
            </div>
          </div>
        </div>

        {/* Info Cards – Seulement 3 cartes */}
        <div className="mt-16 pt-10 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactInfoData.map((info, index) => (
              <InfoCard key={index} info={info} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;