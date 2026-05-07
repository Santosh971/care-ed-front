import AnimatedSection from '../AnimatedSection';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

const ContactCardSection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const {
    title,
    contactName,
    email,
    phone,
    tollFree,
    address,
    hours = [],
    mapEmbedUrl
  } = section;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center">
              {title}
            </h2>
          )}
        </AnimatedSection>

        <div className="max-w-4xl mx-auto">
          <AnimatedSection animation="fade-up" delay={100}>
            <div className="bg-gray-50 rounded-xl p-8 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Information */}
                <div>
                  {contactName && (
                    <h3 className="text-xl font-semibold text-primary mb-6">
                      {contactName}
                    </h3>
                  )}

                  <div className="space-y-4">
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        className="flex items-center gap-3 text-gray-600 hover:text-secondary transition-colors"
                      >
                        <Mail size={20} className="text-secondary flex-shrink-0" />
                        <span>{email}</span>
                      </a>
                    )}

                    {phone && (
                      <a
                        href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                        className="flex items-center gap-3 text-gray-600 hover:text-secondary transition-colors"
                      >
                        <Phone size={20} className="text-secondary flex-shrink-0" />
                        <span>{phone}</span>
                      </a>
                    )}

                    {tollFree && (
                      <a
                        href={`tel:${tollFree.replace(/[^0-9+]/g, '')}`}
                        className="flex items-center gap-3 text-gray-600 hover:text-secondary transition-colors"
                      >
                        <Phone size={20} className="text-secondary flex-shrink-0" />
                        <span>Toll-Free: {tollFree}</span>
                      </a>
                    )}

                    {address && (address.street || address.city) && (
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPin size={20} className="text-secondary flex-shrink-0 mt-1" />
                        <span>
                          {address.street}{address.street && address.city ? ', ' : ''}{address.city}
                        </span>
                      </div>
                    )}

                    {/* Legacy support for string address */}
                    {address && typeof address === 'string' && (
                      <div className="flex items-start gap-3 text-gray-600">
                        <MapPin size={20} className="text-secondary flex-shrink-0 mt-1" />
                        <span>{address}</span>
                      </div>
                    )}

                    {hours && hours.length > 0 && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-primary font-medium mb-2">
                          <Clock size={18} className="text-secondary" />
                          <span>Office Hours</span>
                        </div>
                        {hours.map((hour, index) => (
                          <div key={index} className="flex justify-between text-sm text-gray-600 ml-6">
                            <span>{hour.day}</span>
                            <span>{hour.time}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Map */}
                {mapEmbedUrl && (
                  <div className="rounded-lg overflow-hidden h-64 md:h-auto">
                    <iframe
                      src={mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: '250px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location Map"
                    />
                  </div>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default ContactCardSection;