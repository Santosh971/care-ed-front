import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2, Save, RefreshCw, Menu, X, ChevronDown } from 'lucide-react';
import { usePageData, useUpdateSection } from '../../hooks/usePageData';
import SectionEditor, {
  TextInput,
  TextArea,
  Toggle,
  Select,
  ImageUpload,
  URLInput,
  ArrayEditor,
  ButtonEditor
} from '../components/SectionEditor';
import { getStaticPageData } from '../../data/staticData';

// Map page IDs to their display names and sections
const pageConfig = {
  home: {
    name: 'Home Page',
    sections: [
      { id: 'hero', name: 'Hero Section', icon: '🌟' },
      { id: 'stats', name: 'Statistics', icon: '📊' },
      { id: 'features', name: 'Features', icon: '✨' },
      { id: 'programs', name: 'Programs', icon: '📚' },
      { id: 'about', name: 'About Preview', icon: 'ℹ️' },
      { id: 'testimonials', name: 'Testimonials', icon: '💬' },
      { id: 'cta', name: 'Call to Action', icon: '🎯' },
      { id: 'bottomCta', name: 'Bottom CTA', icon: '📞' }
    ]
  },
  about: {
    name: 'About Page',
    sections: [
      { id: 'hero', name: 'Hero Section', icon: '🌟' },
      { id: 'mission', name: 'Mission', icon: '🎯' },
      { id: 'values', name: 'Values', icon: '💎' },
      { id: 'timeline', name: 'Timeline', icon: '📅' },
      { id: 'leadership', name: 'Leadership Team', icon: '👥' },
      { id: 'location', name: 'Location', icon: '📍' },
      { id: 'whyChoose', name: 'Why Choose Us', icon: '✅' },
      { id: 'cta', name: 'Call to Action', icon: '🎯' }
    ]
  },
  services: {
    name: 'Services Page',
    sections: [
      { id: 'hero', name: 'Hero Section', icon: '🌟' },
      { id: 'services', name: 'Home Care Services', icon: '🏠' },
      { id: 'specialized', name: 'Specialized Programs', icon: '⚕️' },
      { id: 'insurance', name: 'Insurance Partners', icon: '🛡️' }
    ]
  },
  'care-ed': {
    name: 'Care-Ed Page',
    sections: [
      { id: 'hero', name: 'Hero Section', icon: '🌟' },
      { id: 'intro', name: 'Introduction', icon: '📖' },
      { id: 'programs', name: 'Educational Programs', icon: '🎓' },
      { id: 'workshops', name: 'Professional Workshops', icon: '📝' },
      { id: 'accreditations', name: 'Accreditations', icon: '🏆' },
      { id: 'instructors', name: 'Instructors', icon: '👨‍🏫' },
      { id: 'cta', name: 'Call to Action', icon: '🎯' }
    ]
  },
  careers: {
    name: 'Careers Page',
    sections: [
      { id: 'hero', name: 'Hero Section', icon: '🌟' },
      { id: 'careerServices', name: 'Career Services', icon: '💼' },
      { id: 'careerJourney', name: 'Career Journey', icon: '🎓' },
      { id: 'whyJoinUs', name: 'Why Join Us', icon: '💡' },
      { id: 'benefits', name: 'Benefits', icon: '🎁' },
      { id: 'employerConnections', name: 'Employer Connections', icon: '🏢' },
      { id: 'positions', name: 'Open Positions', icon: '📋' },
      { id: 'generalRequirements', name: 'General Requirements', icon: '📋' },
      { id: 'trainingCard', name: 'Training Card', icon: '🎓' },
      { id: 'howToApply', name: 'How to Apply', icon: '📧' },
      { id: 'cta', name: 'Call to Action', icon: '🎯' }
    ]
  },
  contact: {
    name: 'Contact Page',
    sections: [
      { id: 'hero', name: 'Hero Section', icon: '🌟' },
      // { id: 'info', name: 'Contact Information', icon: '📞' },
      { id: 'hours', name: 'Office Hours', icon: '🕐' },
      { id: 'areas', name: 'Service Areas', icon: '📍' },
      { id: 'quickContact', name: 'Quick Contact', icon: '⚡' },
      { id: 'cta', name: 'Call to Action', icon: '🎯' }
    ]
  },
  global: {
    name: 'Global Settings',
    sections: [
      // { id: 'navbar', name: 'Navigation', icon: '🧭' },
      { id: 'footer', name: 'Footer', icon: '📋' }
    ]
  }
};

const PageEditor = () => {
  const { pageId } = useParams();
  const { data, loading, error, fromApi, refetch } = usePageData(pageId, { includeInactive: true, refetchOnFocus: false });
  const { updateSection, loading: saving } = useUpdateSection();
  const [activeSection, setActiveSection] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ type: '', message: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const config = pageConfig[pageId] || { name: pageId, sections: [] };

  // Set first section as active when data loads
  useEffect(() => {
    if (config.sections.length > 0 && !activeSection) {
      setActiveSection(config.sections[0].id);
    }
  }, [config.sections, activeSection]);

  const handleSave = async (sectionId, sectionData) => {
    setSaveStatus({ type: '', message: '' });
    try {
      await updateSection(pageId, sectionId, sectionData);
      setSaveStatus({ type: 'success', message: 'Section saved successfully!' });
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
      refetch();
    } catch (err) {
      setSaveStatus({ type: 'error', message: 'Failed to save section. Please try again.' });
    }
  };

  const handleSectionSelect = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  const activeSectionName = config.sections.find((s) => s.id === activeSection);

  // Render section fields based on section type
  const renderSectionFields = (sectionId, section, onChange) => {
    const sectionData = section || {};

    switch (sectionId) {
      case 'hero':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Title"
                value={sectionData?.title}
                onChange={(val) => onChange('title', val)}
                placeholder="Enter hero title"
                required
              />
              {/* Hide Subtitle for Contact page Hero section */}
              {!(pageId === 'contact' && sectionId === 'hero') && (
                <TextInput
                  label="Subtitle / Badge Text"
                  value={sectionData?.subtitle}
                  onChange={(val) => onChange('subtitle', val)}
                  placeholder="Enter subtitle or badge text"
                />
              )}
            </div>
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              placeholder="Enter hero description"
              rows={3}
            />
            <ImageUpload
              label="Background Image"
              value={sectionData?.images?.[0]}
              onChange={(val) => onChange('images', val ? [val] : [])}
              hint="Recommended size: 1920x1080px. Uploads to Cloudinary."
              folder="images"
            />
            {/* Hide Trust Indicators for About, Care-Ed, and Contact page Hero sections */}
            {!((pageId === 'home' || pageId === 'about' || pageId === 'care-ed' || pageId === 'contact' || pageId === 'careers') && sectionId === 'hero') && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Trust Indicators</h4>
                <p className="text-sm text-gray-500 mb-3">Display trust badges below the hero section</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextInput
                    label="Avatar Count"
                    type="number"
                    value={sectionData?.trustIndicators?.avatarCount || 4}
                    onChange={(val) => onChange('trustIndicators', {
                      ...sectionData?.trustIndicators,
                      avatarCount: parseInt(val) || 4
                    })}
                    placeholder="4"
                    hint="Number of avatar circles to display"
                  />
                  <TextInput
                    label="Trust Text"
                    value={sectionData?.trustIndicators?.text || ''}
                    onChange={(val) => onChange('trustIndicators', {
                      ...sectionData?.trustIndicators,
                      text: val
                    })}
                    placeholder="500+ Students Graduated"
                    hint="Text displayed next to avatars"
                  />
                </div>
              </div>
            )}
            {/* Hide CTA Buttons for About, Care-Ed, and Contact page Hero sections */}
            {!((pageId === 'about' || pageId === 'care-ed' || pageId === 'contact' || pageId === 'careers') && sectionId === 'hero') && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">CTA Buttons</h4>
                <div className="space-y-3">
                  <ButtonEditor
                    label="Primary Button"
                    value={sectionData?.buttons?.[0] || sectionData?.content?.ctaPrimary || { text: '', link: '', style: 'primary' }}
                    onChange={(val) => {
                      const currentButtons = sectionData?.buttons || [];
                      const secondaryButton = currentButtons[1] || sectionData?.content?.ctaSecondary || { text: '', link: '', style: 'secondary' };
                      const newButtons = [val, secondaryButton];
                      onChange('buttons', newButtons);
                      onChange('content', { ...sectionData?.content, ctaPrimary: val, ctaSecondary: secondaryButton });
                    }}
                  />
                  <ButtonEditor
                    label="Secondary Button"
                    value={sectionData?.buttons?.[1] || sectionData?.content?.ctaSecondary || { text: '', link: '', style: 'secondary' }}
                    onChange={(val) => {
                      const currentButtons = sectionData?.buttons || [];
                      const primaryButton = currentButtons[0] || sectionData?.content?.ctaPrimary || { text: '', link: '', style: 'primary' };
                      const newButtons = [primaryButton, val];
                      onChange('buttons', newButtons);
                      onChange('content', { ...sectionData?.content, ctaPrimary: primaryButton, ctaSecondary: val });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="e.g., Our Impact"
            />
            <ArrayEditor
              label="Statistics"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Statistic"
              defaultItem={{ number: 0, suffix: '', label: 'New Stat', icon: 'Award' }}
              renderItem={(item, onUpdate, index) => (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <TextInput
                    label="Number"
                    type="number"
                    value={item?.number}
                    onChange={(val) => onUpdate({ ...item, number: parseInt(val) || 0 })}
                  />
                  <TextInput
                    label="Suffix"
                    value={item?.suffix}
                    onChange={(val) => onUpdate({ ...item, suffix: val })}
                    placeholder="e.g., +, %"
                  />
                  <TextInput
                    label="Label"
                    value={item?.label}
                    onChange={(val) => onUpdate({ ...item, label: val })}
                    placeholder="e.g., Years Experience"
                  />
                  <Select
                    label="Icon"
                    value={item?.icon}
                    onChange={(val) => onUpdate({ ...item, icon: val })}
                    options={[
                      { value: 'Award', label: 'Award' },
                      { value: 'BadgeCheck', label: 'Badge Check' },
                      { value: 'Users', label: 'Users' },
                      { value: 'Star', label: 'Star' },
                      { value: 'GraduationCap', label: 'Graduation Cap' },
                      { value: 'Clock', label: 'Clock' },
                      { value: 'Briefcase', label: 'Briefcase' }
                    ]}
                  />
                </div>
              )}
            />
          </div>
        );

      case 'features':
      case 'programs':
        return (
          <div className="space-y-6">
            {!(sectionId === 'features') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Section Title"
                  value={sectionData?.title}
                  onChange={(val) => onChange('title', val)}
                />
                <TextInput
                  label="Subtitle"
                  value={sectionData?.subtitle}
                  onChange={(val) => onChange('subtitle', val)}
                />
              </div>
            )}
            {!(sectionId === 'features') && !(pageId === 'care-ed' && sectionId === 'programs') && (
              <TextArea
                label="Description"
                value={sectionData?.description}
                onChange={(val) => onChange('description', val)}
                rows={2}
              />
            )}
            <ArrayEditor
              label={sectionId === 'programs' ? 'Programs' : 'Features'}
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel={sectionId === 'programs' ? 'Add Program' : 'Add Feature'}
              defaultItem={sectionId === 'programs' ? { id: '', title: 'New Program', description: '', icon: 'GraduationCap', link: '/care-ed', image: null, duration: '', features: [], prerequisites: [] } : { title: 'New Feature', description: '', icon: 'Award', image: null }}
              renderItem={(item, onUpdate, index) => (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Title"
                      value={item?.title}
                      onChange={(val) => onUpdate({ ...item, title: val })}
                    />
                    {sectionId === 'programs' && (
                      <TextInput
                        label="Program ID"
                        value={item?.id}
                        onChange={(val) => onUpdate({ ...item, id: val })}
                        placeholder="psw"
                      />
                    )}
                  </div>
                  <TextArea
                    label="Description"
                    value={item?.description}
                    onChange={(val) => onUpdate({ ...item, description: val })}
                    rows={2}
                  />
                  {sectionId === 'programs' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <TextInput
                          label="Duration"
                          value={item?.duration}
                          onChange={(val) => onUpdate({ ...item, duration: val })}
                          placeholder="6 months"
                        />
                        <Select
                          label="Icon"
                          value={item?.icon}
                          onChange={(val) => onUpdate({ ...item, icon: val })}
                          options={[
                            { value: 'GraduationCap', label: 'Graduation Cap' },
                            { value: 'BookOpen', label: 'Book Open' },
                            { value: 'Users', label: 'Users' },
                            { value: 'Heart', label: 'Heart' },
                            { value: 'Activity', label: 'Activity' },
                            { value: 'Award', label: 'Award' },
                            { value: 'Briefcase', label: 'Briefcase' }
                          ]}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <TextInput
                          label="Link URL"
                          value={item?.link}
                          onChange={(val) => onUpdate({ ...item, link: val })}
                          placeholder="/care-ed"
                          hint="URL for the Learn More button"
                        />
                        <ImageUpload
                          label="Background Image"
                          value={item?.image ? { url: item.image, publicId: item.imagePublicId } : null}
                          onChange={(val) => onUpdate({ ...item, image: val?.url, imagePublicId: val?.publicId })}
                          folder="programs"
                          hint="Upload background image for program card"
                        />
                      </div>
                      <div className="border-t pt-3">
                        <h5 className="font-medium text-sm text-gray-700 mb-2">Features (What You'll Learn)</h5>
                        <ArrayEditor
                          label=""
                          items={item?.features}
                          onChange={(val) => onUpdate({ ...item, features: val })}
                          addItemLabel="Add Feature"
                          defaultItem=""
                          renderItem={(feature, onFeatureUpdate, fidx) => (
                            <TextInput
                              label=""
                              value={typeof feature === 'string' ? feature : feature?.title}
                              onChange={(val) => onFeatureUpdate(val)}
                              placeholder="Hands-on practicum experience"
                            />
                          )}
                        />
                      </div>
                      <div className="border-t pt-3">
                        <h5 className="font-medium text-sm text-gray-700 mb-2">Prerequisites</h5>
                        <ArrayEditor
                          label=""
                          items={item?.prerequisites}
                          onChange={(val) => onUpdate({ ...item, prerequisites: val })}
                          addItemLabel="Add Prerequisite"
                          defaultItem=""
                          renderItem={(prereq, onPrereqUpdate, pidx) => (
                            <TextInput
                              label=""
                              value={typeof prereq === 'string' ? prereq : prereq?.title}
                              onChange={(val) => onPrereqUpdate(val)}
                              placeholder="High School or GED Certificate"
                            />
                          )}
                        />
                      </div>
                    </>
                  )}
                  {sectionId === 'features' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Select
                        label="Icon"
                        value={item?.icon}
                        onChange={(val) => onUpdate({ ...item, icon: val })}
                        options={[
                          { value: 'Award', label: 'Award' },
                          { value: 'GraduationCap', label: 'Graduation Cap' },
                          { value: 'Heart', label: 'Heart' },
                          { value: 'Activity', label: 'Activity' },
                          { value: 'BookOpen', label: 'Book Open' },
                          { value: 'Briefcase', label: 'Briefcase' },
                          { value: 'Users', label: 'Users' },
                          { value: 'Clock', label: 'Clock' },
                          { value: 'Target', label: 'Target' },
                          { value: 'CheckCircle', label: 'Check Circle' }
                        ]}
                      />
                      <ImageUpload
                        label="Image (optional)"
                        value={item?.image ? { url: item.image } : null}
                        onChange={(val) => onUpdate({ ...item, image: val?.url })}
                        folder="features"
                        hint="Upload an image to display instead of icon"
                      />
                    </div>
                  )}
                </div>
              )}
            />
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Professional Healthcare Education & Training"
            />
            <TextArea
              label="Main Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={3}
              placeholder="Main description about Care-Ed..."
            />
            <TextArea
              label="Additional Content"
              value={sectionData?.content}
              onChange={(val) => onChange('content', val)}
              rows={2}
              placeholder="Additional content paragraph..."
            />
            <ArrayEditor
              label="Key Features"
              items={sectionData?.features}
              onChange={(val) => onChange('features', val)}
              addItemLabel="Add Feature"
              defaultItem=""
              renderItem={(item, onUpdate, index) => (
                <TextInput
                  label={`Feature ${index + 1}`}
                  value={typeof item === 'string' ? item : item?.title}
                  onChange={(val) => onUpdate(val)}
                  placeholder="e.g., Licensed RN/LPN Instructors"
                />
              )}
            />
            <ImageUpload
              label="Section Image"
              value={sectionData?.images?.[0]}
              onChange={(val) => onChange('images', val ? [val] : [])}
              folder="images"
              hint="Recommended size: 600x400px"
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Badge/Counter</h4>
              <p className="text-sm text-gray-500 mb-3">The floating badge showing years/experience</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInput
                  label="Number"
                  type="number"
                  value={sectionData?.badge?.number || 15}
                  onChange={(val) => onChange('badge', {
                    ...sectionData?.badge,
                    number: parseInt(val) || 0
                  })}
                  placeholder="15"
                />
                <TextInput
                  label="Suffix"
                  value={sectionData?.badge?.suffix ?? '+'}
                  onChange={(val) => onChange('badge', {
                    ...sectionData?.badge,
                    suffix: val
                  })}
                  placeholder="+"
                />
                <TextInput
                  label="Label"
                  value={sectionData?.badge?.label || 'Years Teaching'}
                  onChange={(val) => onChange('badge', {
                    ...sectionData?.badge,
                    label: val
                  })}
                  placeholder="Years Teaching"
                />
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Button</h4>
              <ButtonEditor
                label="CTA Button"
                value={sectionData?.buttons?.[0] || { text: 'Learn More About Us', link: '/about', style: 'primary' }}
                onChange={(val) => onChange('buttons', [val])}
              />
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="What Our Students Say"
            />
            <TextArea
              label="Section Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={2}
              placeholder="Hear from our graduates who have successfully started their healthcare careers."
            />
            <ArrayEditor
              label="Testimonials"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Testimonial"
              defaultItem={{ quote: '', author: '', role: '' }}
              renderItem={(item, onUpdate, index) => (
                <div className="space-y-3">
                  <TextArea
                    label="Quote"
                    value={item?.quote || item?.content}
                    onChange={(val) => onUpdate({ ...item, quote: val, content: val })}
                    rows={3}
                    placeholder="The program was excellent..."
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Author Name"
                      value={item?.author || item?.name}
                      onChange={(val) => onUpdate({ ...item, author: val })}
                      placeholder="John D."
                    />
                    <TextInput
                      label="Role/Position"
                      value={item?.role}
                      onChange={(val) => onUpdate({ ...item, role: val })}
                      placeholder="PSW Graduate, Class of 2024"
                    />
                  </div>
                </div>
              )}
            />
            <Toggle
              label="Active"
              checked={sectionData?.isActive !== false}
              onChange={(val) => onChange('isActive', val)}
            />
          </div>
        );

      case 'cta':
        if (pageId === 'care-ed' || pageId === 'about' || pageId === 'careers') {
          return (
            <div className="space-y-6">
              <TextInput
                label="Title"
                value={sectionData?.title}
                onChange={(val) => onChange('title', val)}
                placeholder="Ready to Start Your Healthcare Career?"
              />
              <TextArea
                label="Description"
                value={sectionData?.description}
                onChange={(val) => onChange('description', val)}
                rows={3}
                placeholder="Contact us today to learn more about our programs..."
              />
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">Primary Button</h4>
                <ButtonEditor
                  label="Primary Button"
                  value={sectionData?.buttons?.[0] || { text: 'Contact Us', link: '/contact', style: 'primary' }}
                  onChange={(val) => {
                    onChange('buttons', [val]);
                  }}
                />
              </div>
              {/* Hidden: Secondary Button - not used on Careers page */}
              {/* Hidden: Contact Information - not used on Careers page */}
            </div>
          );
        }

        // Contact page CTA
        if (pageId === 'contact') {
          return (
            <div className="space-y-6">
              <TextInput
                label="Title"
                value={sectionData?.title}
                onChange={(val) => onChange('title', val)}
                placeholder="Start Your Healthcare Career"
              />
              <TextArea
                label="Description"
                value={sectionData?.description}
                onChange={(val) => onChange('description', val)}
                rows={3}
                placeholder="Whether you're interested in our PSW program..."
              />
              <div className="border-t pt-4">
                <h4 className="font-medium mb-3">CTA Button</h4>
                <ButtonEditor
                  label="Button"
                  value={sectionData?.buttons?.[0] || { text: '', link: '', style: 'primary' }}
                  onChange={(val) => onChange('buttons', [val])}
                />
              </div>
            </div>
          );
        }

        // Home page CTA (with features, badge, images)
        return (
          <div className="space-y-6">
            <TextInput
              label="Badge/Tagline"
              value={sectionData?.subtitle}
              onChange={(val) => onChange('subtitle', val)}
              placeholder="Start Your Journey"
              hint="Small text displayed above the title"
            />
            <TextInput
              label="Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Ready to Start Your Healthcare Career?"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={3}
              placeholder="Join hundreds of graduates..."
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Feature Items</h4>
              <p className="text-sm text-gray-500 mb-3">The grid of items displayed (e.g., PSW Program, First Aid)</p>
              <ArrayEditor
                label="Features"
                items={sectionData?.features}
                onChange={(val) => onChange('features', val)}
                addItemLabel="Add Feature"
                defaultItem={{ icon: 'GraduationCap', label: 'New Feature' }}
                renderItem={(item, onUpdate, index) => (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Select
                      label="Icon"
                      value={item?.icon}
                      onChange={(val) => onUpdate({ ...item, icon: val })}
                      options={[
                        { value: 'GraduationCap', label: 'Graduation Cap' },
                        { value: 'Heart', label: 'Heart' },
                        { value: 'Activity', label: 'Activity' },
                        { value: 'BookOpen', label: 'Book Open' },
                        { value: 'Award', label: 'Award' },
                        { value: 'Briefcase', label: 'Briefcase' },
                        { value: 'Users', label: 'Users' },
                        { value: 'Clock', label: 'Clock' },
                        { value: 'Star', label: 'Star' }
                      ]}
                    />
                    <TextInput
                      label="Label"
                      value={item?.label}
                      onChange={(val) => onUpdate({ ...item, label: val })}
                      placeholder="PSW Program"
                    />
                  </div>
                )}
              />
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Counter Badge</h4>
              <p className="text-sm text-gray-500 mb-3">The floating badge with percentage/number</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TextInput
                  label="Number"
                  type="number"
                  value={sectionData?.badge?.number || 95}
                  onChange={(val) => onChange('badge', {
                    ...sectionData?.badge,
                    number: parseInt(val) || 0
                  })}
                  placeholder="95"
                />
                <TextInput
                  label="Suffix"
                  value={sectionData?.badge?.suffix || '%'}
                  onChange={(val) => onChange('badge', {
                    ...sectionData?.badge,
                    suffix: val
                  })}
                  placeholder="%"
                />
                <TextInput
                  label="Label"
                  value={sectionData?.badge?.label || 'Job Placement Rate'}
                  onChange={(val) => onChange('badge', {
                    ...sectionData?.badge,
                    label: val
                  })}
                  placeholder="Job Placement Rate"
                />
              </div>
            </div>
            <ImageUpload
              label="Background Image"
              value={sectionData?.images?.[0]}
              onChange={(val) => onChange('images', val ? [val] : [])}
              folder="images"
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">CTA Button</h4>
              <ButtonEditor
                label="Primary Button"
                value={sectionData?.buttons?.[0] || { text: '', link: '', style: 'primary' }}
                onChange={(val) => onChange('buttons', [val])}
              />
            </div>
          </div>
        );

      case 'bottomCta':
        return (
          <div className="space-y-6">
            <TextInput
              label="Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Enroll in Our Programs Today"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={3}
              placeholder="Take the first step toward a rewarding career..."
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Primary Button</h4>
              <ButtonEditor
                label="Primary Button"
                value={sectionData?.buttons?.[0] || { text: 'View Programs', link: '/care-ed', style: 'primary' }}
                onChange={(val) => {
                  const secondaryButton = sectionData?.buttons?.[1] || { text: 'Contact Us', link: '/contact', style: 'secondary' };
                  onChange('buttons', [val, secondaryButton]);
                }}
              />
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Secondary Button</h4>
              <ButtonEditor
                label="Secondary Button"
                value={sectionData?.buttons?.[1] || { text: 'Contact Us', link: '/contact', style: 'secondary' }}
                onChange={(val) => {
                  const primaryButton = sectionData?.buttons?.[0] || { text: 'View Programs', link: '/care-ed', style: 'primary' };
                  onChange('buttons', [primaryButton, val]);
                }}
              />
            </div>
          </div>
        );

      case 'mission':
        return (
          <div className="space-y-6">
            <TextInput
              label="Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Our Mission"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={3}
              placeholder="Mission statement..."
            />
            <TextArea
              label="Additional Content / Vision"
              value={sectionData?.content?.vision}
              onChange={(val) => onChange('content', { ...sectionData?.content, vision: val })}
              rows={2}
              placeholder="Vision or additional content..."
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Statistics</h4>
              <p className="text-sm text-gray-500 mb-3">The counter stats displayed in the mission section</p>
              <ArrayEditor
                label="Stats"
                items={sectionData?.stats}
                onChange={(val) => onChange('stats', val)}
                addItemLabel="Add Stat"
                defaultItem={{ number: 0, suffix: '', label: 'New Stat' }}
                renderItem={(item, onUpdate, index) => (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <TextInput
                      label="Number"
                      type="number"
                      value={item?.number || 0}
                      onChange={(val) => onUpdate({ ...item, number: parseInt(val) || 0 })}
                      placeholder="15"
                    />
                    <TextInput
                      label="Suffix"
                      value={item?.suffix || ''}
                      onChange={(val) => onUpdate({ ...item, suffix: val })}
                      placeholder="+"
                    />
                    <TextInput
                      label="Label"
                      value={item?.label || ''}
                      onChange={(val) => onUpdate({ ...item, label: val })}
                      placeholder="Years Teaching"
                    />
                  </div>
                )}
              />
            </div>
            <ImageUpload
              label="Section Image"
              value={sectionData?.images?.[0]}
              onChange={(val) => onChange('images', val ? [val] : [])}
              folder="images"
            />
          </div>
        );

      case 'values':
      case 'timeline':
      case 'benefits':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
            />
            {(sectionId === 'values' || sectionId === 'timeline') && (
              <TextInput
                label="Subtitle"
                value={sectionData?.subtitle}
                onChange={(val) => onChange('subtitle', val)}
                placeholder={sectionId === 'values' ? "The principles that guide our educational programs." : "A legacy of healthcare education and professional training."}
              />
            )}
            {sectionId === 'benefits' && (
              <ImageUpload
                label="Section Image"
                value={sectionData?.sectionImage || null}
                onChange={(val) => onChange('sectionImage', val)}
                folder="images"
                hint="Image displayed on the right side of the Benefits section. Recommended size: 800x600px"
              />
            )}
            <ArrayEditor
              label="Items"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Item"
              defaultItem={sectionId === 'timeline' ? { year: '', title: '', description: '' } : { title: '', description: '', icon: 'Award' }}
              renderItem={(item, onUpdate, index) => {
                const currentYear = new Date().getFullYear();
                const years = Array.from({ length: currentYear + 5 - 1950 + 1 }, (_, i) => 1950 + i).reverse();

                return (
                  <div className="space-y-3">
                    {sectionId === 'timeline' ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Select
                          label="Year"
                          value={item?.year}
                          onChange={(val) => onUpdate({ ...item, year: val })}
                          options={[
                            { value: '', label: 'Select Year' },
                            ...years.map(year => ({ value: String(year), label: String(year) }))
                          ]}
                        />
                        <TextInput
                          label="Title"
                          value={item?.title}
                          onChange={(val) => onUpdate({ ...item, title: val })}
                          placeholder="Event title"
                        />
                        <div></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <TextInput
                          label="Title"
                          value={item?.title}
                          onChange={(val) => onUpdate({ ...item, title: val })}
                        />
                        <Select
                          label="Icon"
                          value={item?.icon}
                          onChange={(val) => onUpdate({ ...item, icon: val })}
                          options={[
                            { value: 'Award', label: 'Award' },
                            { value: 'GraduationCap', label: 'Graduation Cap' },
                            { value: 'Heart', label: 'Heart' },
                            { value: 'Users', label: 'Users' },
                            { value: 'Target', label: 'Target' },
                            { value: 'CheckCircle', label: 'Check Circle' },
                            { value: 'BookOpen', label: 'Book Open' },
                            { value: 'Briefcase', label: 'Briefcase' }
                          ]}
                        />
                      </div>
                    )}
                    <TextArea
                      label="Description"
                      value={item?.description}
                      onChange={(val) => onUpdate({ ...item, description: val })}
                      rows={2}
                    />
                  </div>
                );
              }}
            />
          </div>
        );

      case 'leadership':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Leadership Team"
            />
            <TextInput
              label="Subtitle"
              value={sectionData?.subtitle}
              onChange={(val) => onChange('subtitle', val)}
              placeholder="Dedicated professionals committed to excellence in healthcare education."
            />
            <ArrayEditor
              label="Team Members"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Team Member"
              defaultItem={{ name: '', role: '', bio: '', image: '' }}
              renderItem={(item, onUpdate, index) => (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Name"
                      value={item?.name}
                      onChange={(val) => onUpdate({ ...item, name: val })}
                      placeholder="John Doe"
                    />
                    <TextInput
                      label="Role/Position"
                      value={item?.role}
                      onChange={(val) => onUpdate({ ...item, role: val })}
                      placeholder="President & CEO"
                    />
                  </div>
                  <TextArea
                    label="Bio"
                    value={item?.bio}
                    onChange={(val) => onUpdate({ ...item, bio: val })}
                    rows={3}
                    placeholder="Brief biography..."
                  />
                  <ImageUpload
                    label="Photo"
                    value={item?.image ? { url: item.image } : null}
                    onChange={(val) => onUpdate({ ...item, image: val?.url })}
                    folder="team"
                    hint="Recommended: Square image, 400x400px"
                  />
                </div>
              )}
            />
          </div>
        );

      case 'location':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Location"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={2}
              placeholder="Conveniently located in Saint John..."
            />
            <TextInput
              label="Visit Label"
              value={sectionData?.visitLabel}
              onChange={(val) => onChange('visitLabel', val)}
              placeholder="Visit Us"
              hint="Label displayed above the address"
            />
            <TextInput
              label="Google Maps Embed URL"
              value={sectionData?.mapEmbedUrl}
              onChange={(val) => onChange('mapEmbedUrl', val)}
              placeholder="https://www.google.com/maps/embed?pb=..."
              hint="Get embed URL from Google Maps > Share > Embed a map"
            />

            {/* About -> Address and contact */}

            {/* <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Address</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextInput
                  label="Street Address"
                  value={sectionData?.address?.street}
                  onChange={(val) => onChange('address', { ...sectionData?.address, street: val })}
                  placeholder="100 Prince Edward St Unit #111"
                />
                <TextInput
                  label="City, Province, Postal"
                  value={sectionData?.address?.city}
                  onChange={(val) => onChange('address', { ...sectionData?.address, city: val })}
                  placeholder="Saint John, NB E2L 4M5"
                />
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextInput
                  label="Phone"
                  value={sectionData?.phone}
                  onChange={(val) => onChange('phone', val)}
                  placeholder="(506) 634-8906"
                />
                <TextInput
                  label="Toll-Free"
                  value={sectionData?.tollFree}
                  onChange={(val) => onChange('tollFree', val)}
                  placeholder="1(800) 561-2463"
                />
              </div>
            </div> */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Service Areas</h4>
              <ArrayEditor
                label="Areas"
                items={sectionData?.areas}
                onChange={(val) => onChange('areas', val)}
                addItemLabel="Add Area"
                defaultItem={{ name: '' }}
                renderItem={(item, onUpdate, index) => (
                  <TextInput
                    label="Area Name"
                    value={item?.name}
                    onChange={(val) => onUpdate({ ...item, name: val })}
                    placeholder="Saint John"
                  />
                )}
              />
            </div>
          </div>
        );

      case 'whyChoose':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Why Choose Care-Ed?"
            />
            <TextInput
              label="Subtitle"
              value={sectionData?.subtitle}
              onChange={(val) => onChange('subtitle', val)}
              placeholder="Discover what makes us the right choice for your healthcare education."
            />
            <ArrayEditor
              label="Key Points"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Point"
              defaultItem={{ title: '' }}
              renderItem={(item, onUpdate, index) => (
                <TextInput
                  label="Point"
                  value={typeof item === 'string' ? item : item?.title}
                  onChange={(val) => onUpdate({ title: val })}
                  placeholder="Approved training programs..."
                />
              )}
            />
            <ImageUpload
              label="Section Image"
              value={sectionData?.images?.[0]}
              onChange={(val) => onChange('images', val ? [val] : [])}
              folder="images"
              hint="Recommended size: 600x400px"
            />
          </div>
        );

      case 'services':
      case 'specialized':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={2}
            />
            <ArrayEditor
              label={sectionId === 'services' ? 'Services' : 'Specialized Programs'}
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Service"
              defaultItem={{ id: '', title: '', description: '', icon: 'Heart' }}
              renderItem={(item, onUpdate, index) => (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="ID / Slug"
                      value={item?.id}
                      onChange={(val) => onUpdate({ ...item, id: val })}
                      placeholder="home-care"
                    />
                    <TextInput
                      label="Title"
                      value={item?.title}
                      onChange={(val) => onUpdate({ ...item, title: val })}
                    />
                  </div>
                  <TextArea
                    label="Description"
                    value={item?.description}
                    onChange={(val) => onUpdate({ ...item, description: val })}
                    rows={2}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Select
                      label="Icon"
                      value={item?.icon}
                      onChange={(val) => onUpdate({ ...item, icon: val })}
                      options={[
                        { value: 'Home', label: 'Home' },
                        { value: 'Heart', label: 'Heart' },
                        { value: 'Activity', label: 'Activity' },
                        { value: 'User', label: 'User' },
                        { value: 'Phone', label: 'Phone' },
                        { value: 'Droplet', label: 'Droplet' },
                        { value: 'MessageCircle', label: 'Message Circle' },
                        { value: 'Zap', label: 'Zap' },
                        { value: 'Users', label: 'Users' },
                        { value: 'BookOpen', label: 'Book Open' }
                      ]}
                    />
                    <TextInput
                      label="Link"
                      value={item?.link}
                      onChange={(val) => onUpdate({ ...item, link: val })}
                      placeholder="/services/slug"
                    />
                  </div>
                </div>
              )}
            />
          </div>
        );

      case 'navbar':
        return (
          <div className="space-y-6">
            <h4 className="font-medium">Navigation Links</h4>
            <ArrayEditor
              label="Menu Items"
              items={sectionData?.content?.links}
              onChange={(val) => onChange('content', { ...sectionData?.content, links: val })}
              addItemLabel="Add Link"
              defaultItem={{ label: 'New Page', path: '/new-page' }}
              renderItem={(item, onUpdate, index) => (
                <div className="grid grid-cols-2 gap-3">
                  <TextInput
                    label="Label"
                    value={item?.label}
                    onChange={(val) => onUpdate({ ...item, label: val })}
                  />
                  <TextInput
                    label="Path"
                    value={item?.path}
                    onChange={(val) => onUpdate({ ...item, path: val })}
                  />
                </div>
              )}
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">CTA Button</h4>
              <ButtonEditor
                label="Call to Action Button"
                value={sectionData?.content?.ctaButton}
                onChange={(val) => onChange('content', { ...sectionData?.content, ctaButton: val })}
              />
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Contact Info</h4>
              <div className="grid grid-cols-2 gap-3">
                <TextInput
                  label="Phone"
                  value={sectionData?.content?.contactInfo?.phone}
                  onChange={(val) => onChange('content', { ...sectionData?.content, contactInfo: { ...sectionData?.content?.contactInfo, phone: val } })}
                />
                <TextInput
                  label="Email"
                  value={sectionData?.content?.contactInfo?.email}
                  onChange={(val) => onChange('content', { ...sectionData?.content, contactInfo: { ...sectionData?.content?.contactInfo, email: val } })}
                />
              </div>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h4 className="font-medium mb-3">Company Info</h4>
              <div className="grid grid-cols-1 gap-3">
                <TextInput
                  label="Company Name"
                  value={sectionData?.content?.companyInfo?.name}
                  onChange={(val) => onChange('content', { ...sectionData?.content, companyInfo: { ...sectionData?.content?.companyInfo, name: val } })}
                  placeholder="Care-Ed Learning Center"
                />
                <TextArea
                  label="Description"
                  value={sectionData?.content?.companyInfo?.description}
                  onChange={(val) => onChange('content', { ...sectionData?.content, companyInfo: { ...sectionData?.content?.companyInfo, description: val } })}
                  rows={2}
                  placeholder="Professional healthcare education..."
                />
                <TextInput
                  label="Address"
                  value={sectionData?.content?.companyInfo?.address}
                  onChange={(val) => onChange('content', { ...sectionData?.content, companyInfo: { ...sectionData?.content?.companyInfo, address: val } })}
                  placeholder="100 Prince Edward St, Saint John, NB"
                />
              </div>
            </div>

            <div className="border-b pb-4">
              <h4 className="font-medium mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextInput
                  label="Phone"
                  value={sectionData?.content?.contactInfo?.phone}
                  onChange={(val) => onChange('content', { ...sectionData?.content, contactInfo: { ...sectionData?.content?.contactInfo, phone: val } })}
                  placeholder="(506) 634-8906"
                />
                <TextInput
                  label="Email"
                  type="email"
                  value={sectionData?.content?.contactInfo?.email}
                  onChange={(val) => onChange('content', { ...sectionData?.content, contactInfo: { ...sectionData?.content?.contactInfo, email: val } })}
                  placeholder="info@carelearning.ca"
                />
              </div>
            </div>

            <div className="border-b pb-4">
              <h4 className="font-medium mb-3">Social Links</h4>
              <ArrayEditor
                label="Social Links"
                items={sectionData?.content?.socialLinks}
                onChange={(val) => onChange('content', { ...sectionData?.content, socialLinks: val })}
                addItemLabel="Add Social Link"
                defaultItem={{ platform: '', url: '' }}
                renderItem={(item, onUpdate, index) => (
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      label="Platform"
                      value={item?.platform}
                      onChange={(val) => onUpdate({ ...item, platform: val })}
                      options={[
                        { value: 'Facebook', label: 'Facebook' },
                        { value: 'LinkedIn', label: 'LinkedIn' },
                        { value: 'Twitter', label: 'Twitter' },
                        { value: 'Instagram', label: 'Instagram' },
                        { value: 'YouTube', label: 'YouTube' }
                      ]}
                    />
                    <TextInput
                      label="URL"
                      value={item?.url}
                      onChange={(val) => onUpdate({ ...item, url: val })}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                )}
              />
            </div>

            <div className="border-b pb-4">
              <h4 className="font-medium mb-3">Quick Links</h4>
              <ArrayEditor
                label="Footer Links"
                items={sectionData?.content?.quickLinks}
                onChange={(val) => onChange('content', { ...sectionData?.content, quickLinks: val })}
                addItemLabel="Add Link"
                defaultItem={{ label: 'New Page', path: '/new-page' }}
                renderItem={(item, onUpdate, index) => (
                  <div className="grid grid-cols-2 gap-3">
                    <TextInput
                      label="Label"
                      value={item?.label}
                      onChange={(val) => onUpdate({ ...item, label: val })}
                      placeholder="Home"
                    />
                    <TextInput
                      label="Path"
                      value={item?.path}
                      onChange={(val) => onUpdate({ ...item, path: val })}
                      placeholder="/"
                    />
                  </div>
                )}
              />
            </div>

            <div className="border-b pb-4">
              <h4 className="font-medium mb-3">Programs Links</h4>
              <ArrayEditor
                label="Programs"
                items={sectionData?.content?.programs}
                onChange={(val) => onChange('content', { ...sectionData?.content, programs: val })}
                addItemLabel="Add Program"
                defaultItem={{ label: 'New Program', path: '/care-ed' }}
                renderItem={(item, onUpdate, index) => (
                  <div className="grid grid-cols-2 gap-3">
                    <TextInput
                      label="Label"
                      value={item?.label}
                      onChange={(val) => onUpdate({ ...item, label: val })}
                      placeholder="PSW Program"
                    />
                    <TextInput
                      label="Path"
                      value={item?.path}
                      onChange={(val) => onUpdate({ ...item, path: val })}
                      placeholder="/care-ed"
                    />
                  </div>
                )}
              />
            </div>

            <div className="border-b pb-4">
              <h4 className="font-medium mb-3">Bottom Bar</h4>
              <div className="grid grid-cols-1 gap-3">
                <TextInput
                  label="Copyright Text"
                  value={sectionData?.content?.copyright}
                  onChange={(val) => onChange('content', { ...sectionData?.content, copyright: val })}
                  placeholder="© {year} Care-Ed Inc. All rights reserved."
                  hint="Use {year} to auto-insert current year"
                />
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <TextInput
                    label="Privacy Policy Link"
                    value={sectionData?.content?.privacyLink}
                    onChange={(val) => onChange('content', { ...sectionData?.content, privacyLink: val })}
                    placeholder="/privacy"
                  />
                  <TextInput
                    label="Terms of Service Link"
                    value={sectionData?.content?.termsLink}
                    onChange={(val) => onChange('content', { ...sectionData?.content, termsLink: val })}
                    placeholder="/terms"
                  />
                </div> */}
              </div>
            </div>
          </div>
        );

      case 'positions':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Open Positions"
            />
            <TextArea
              label="Section Subtitle"
              value={sectionData?.subtitle}
              onChange={(val) => onChange('subtitle', val)}
              rows={2}
              placeholder="Explore our current job openings and find the perfect fit for your skills and interests."
            />
            <ArrayEditor
              label="Job Positions"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Position"
              defaultItem={{ id: '', title: '', type: 'Full-time', location: 'Greater Saint John', description: '', requirements: [] }}
              renderItem={(item, onUpdate, index) => (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <TextInput
                      label="Position ID"
                      value={item?.id}
                      onChange={(val) => onUpdate({ ...item, id: val })}
                      placeholder="psw-instructor"
                    />
                    <TextInput
                      label="Title"
                      value={item?.title}
                      onChange={(val) => onUpdate({ ...item, title: val })}
                      placeholder="PSW Instructor"
                    />
                    <TextInput
                      label="Type"
                      value={item?.type}
                      onChange={(val) => onUpdate({ ...item, type: val })}
                      placeholder="Full-time"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Location"
                      value={item?.location}
                      onChange={(val) => onUpdate({ ...item, location: val })}
                      placeholder="Greater Saint John"
                    />
                    <TextInput
                      label="Description"
                      value={item?.description}
                      onChange={(val) => onUpdate({ ...item, description: val })}
                      placeholder="Brief description..."
                    />
                  </div>
                  <ArrayEditor
                    label="Requirements"
                    items={item?.requirements}
                    onChange={(val) => onUpdate({ ...item, requirements: val })}
                    addItemLabel="Add Requirement"
                    defaultItem=""
                    renderItem={(req, onUpdateReq, idx) => (
                      <TextInput
                        label={`Requirement ${idx + 1}`}
                        value={req}
                        onChange={(val) => onUpdateReq(val)}
                        placeholder="Enter requirement"
                      />
                    )}
                  />
                </div>
              )}
            />
          </div>
        );

      case 'info':
        return (
          <div className="space-y-6">
            {!(pageId === 'contact' && sectionId === 'info') && (
              <TextInput
                label="Section Title"
                value={sectionData?.title}
                onChange={(val) => onChange('title', val)}
                placeholder="Contact Information"
              />
            )}
            <ArrayEditor
              label="Contact Items"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Contact Item"
              defaultItem={{ label: '', value: '', icon: 'Phone', link: '' }}
              renderItem={(item, onUpdate, index) => (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Label"
                      value={item?.label}
                      onChange={(val) => onUpdate({ ...item, label: val })}
                      placeholder="Address"
                    />
                    <TextInput
                      label="Value"
                      value={item?.value}
                      onChange={(val) => onUpdate({ ...item, value: val })}
                      placeholder="100 Prince Edward St"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Select
                      label="Icon"
                      value={item?.icon}
                      onChange={(val) => onUpdate({ ...item, icon: val })}
                      options={[
                        { value: 'Phone', label: 'Phone' },
                        { value: 'Mail', label: 'Mail' },
                        { value: 'MapPin', label: 'Map Pin' },
                        { value: 'Clock', label: 'Clock' },
                        { value: 'Globe', label: 'Globe' }
                      ]}
                    />
                    <TextInput
                      label="Link"
                      value={item?.link}
                      onChange={(val) => onUpdate({ ...item, link: val })}
                      placeholder="tel:+15066348906 or https://..."
                      hint="Phone: tel:+number, Email: mailto:email, Web: https://..."
                    />
                  </div>
                </div>
              )}
            />
          </div>
        );

      case 'hours':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Office Hours"
            />
            <ArrayEditor
              label="Hours"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Hours Entry"
              defaultItem={{ days: '', hours: '' }}
              renderItem={(item, onUpdate, index) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <TextInput
                    label="Days"
                    value={item?.days}
                    onChange={(val) => onUpdate({ ...item, days: val })}
                    placeholder="Monday - Friday"
                  />
                  <TextInput
                    label="Hours"
                    value={item?.hours}
                    onChange={(val) => onUpdate({ ...item, hours: val })}
                    placeholder="8:00 AM - 5:00 PM"
                  />
                </div>
              )}
            />
          </div>
        );

      case 'areas':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Serving Students From"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={2}
              placeholder="We welcome students from the Greater Saint John area..."
            />
            <ArrayEditor
              label="Areas"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Area"
              defaultItem={{ name: '' }}
              renderItem={(item, onUpdate, index) => (
                <TextInput
                  label="Area Name"
                  value={item?.name}
                  onChange={(val) => onUpdate({ ...item, name: val })}
                  placeholder="Saint John"
                />
              )}
            />
          </div>
        );

      case 'quickContact':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Quick Contact"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={2}
              placeholder="Have questions about our programs? Our team is ready to help..."
            />
            {/* Contact- contact Cards */}
            {/* <ArrayEditor
              label="Contact Cards"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Contact Card"
              defaultItem={{ icon: 'Phone', title: '', subtitle: '', value: '', link: '' }}
              renderItem={(item, onUpdate, index) => (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Title"
                      value={item?.title}
                      onChange={(val) => onUpdate({ ...item, title: val })}
                      placeholder="Call Us"
                    />
                    <Select
                      label="Icon"
                      value={item?.icon}
                      onChange={(val) => onUpdate({ ...item, icon: val })}
                      options={[
                        { value: 'Phone', label: 'Phone' },
                        { value: 'Mail', label: 'Mail' },
                        { value: 'MapPin', label: 'Map Pin' },
                        { value: 'Clock', label: 'Clock' },
                        { value: 'Globe', label: 'Globe' }
                      ]}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Subtitle"
                      value={item?.subtitle}
                      onChange={(val) => onUpdate({ ...item, subtitle: val })}
                      placeholder="For immediate assistance"
                    />
                    <TextInput
                      label="Value/Display Text"
                      value={item?.value}
                      onChange={(val) => onUpdate({ ...item, value: val })}
                      placeholder="(506) 634-8906"
                    />
                  </div>
                  <TextInput
                    label="Link"
                    value={item?.link}
                    onChange={(val) => onUpdate({ ...item, link: val })}
                    placeholder="tel:+15066348906 or mailto:email@example.com"
                    hint="Phone: tel:+number, Email: mailto:email, Map: https://..."
                  />
                </div>
              )}
            /> */}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Apply Now"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={2}
              placeholder="Contact information for applications..."
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Contact Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextInput
                  label="Email"
                  value={sectionData?.content?.email}
                  onChange={(val) => onChange('content', { ...sectionData?.content, email: val })}
                  placeholder="careers@careed.com"
                />
                <TextInput
                  label="Phone"
                  value={sectionData?.content?.phone}
                  onChange={(val) => onChange('content', { ...sectionData?.content, phone: val })}
                  placeholder="(506) 634-8906"
                />
              </div>
            </div>
          </div>
        );

      case 'whyJoinUs':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Why Work With Us?"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={4}
              placeholder="At Care-ed, we've been providing quality healthcare education and employment opportunities for over 15 years..."
            />
          </div>
        );

      case 'generalRequirements':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="General Requirements"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={3}
              placeholder="All positions require the following documentation and certifications..."
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Requirements List</h4>
              <ArrayEditor
                label="Requirements"
                items={sectionData?.requirements}
                onChange={(val) => onChange('requirements', val)}
                addItemLabel="Add Requirement"
                defaultItem=""
                renderItem={(item, onUpdate, index) => (
                  <TextInput
                    label={`Requirement ${index + 1}`}
                    value={item}
                    onChange={(val) => onUpdate(val)}
                    placeholder="Enter requirement"
                  />
                )}
              />
            </div>
          </div>
        );

      case 'trainingCard':
        return (
          <div className="space-y-6">
            <TextInput
              label="Card Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Training Available"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={3}
              placeholder="Don't have your PSW Certificate yet? We offer comprehensive training..."
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Program Highlights</h4>
              <ArrayEditor
                label="Highlights"
                items={sectionData?.highlights}
                onChange={(val) => onChange('highlights', val)}
                addItemLabel="Add Highlight"
                defaultItem=""
                renderItem={(item, onUpdate, index) => (
                  <TextInput
                    label={`Highlight ${index + 1}`}
                    value={item}
                    onChange={(val) => onUpdate(val)}
                    placeholder="Comprehensive PSW certification program"
                  />
                )}
              />
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">CTA Button</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  label="Button Text"
                  value={sectionData?.ctaText}
                  onChange={(val) => onChange('ctaText', val)}
                  placeholder="Learn About PSW Training"
                />
                <TextInput
                  label="Button Link"
                  value={sectionData?.ctaLink}
                  onChange={(val) => onChange('ctaLink', val)}
                  placeholder="/care-ed"
                />
              </div>
            </div>
          </div>
        );

      case 'howToApply':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="How to Apply"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={2}
              placeholder="Ready to join our team? Here's how to submit your application."
            />

            {/* Careeres page Contact Information */}
            {/* <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <TextInput
                  label="Email"
                  value={sectionData?.email}
                  onChange={(val) => onChange('email', val)}
                  placeholder="train@seniorwatch.com"
                />
                <TextInput
                  label="Phone"
                  value={sectionData?.phone}
                  onChange={(val) => onChange('phone', val)}
                  placeholder="(506) 634-8906"
                />
              </div>
            </div> */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Application Format</h4>
              <ArrayEditor
                label="Application Requirements"
                items={sectionData?.applicationFormat}
                onChange={(val) => onChange('applicationFormat', val)}
                addItemLabel="Add Requirement"
                defaultItem=""
                renderItem={(item, onUpdate, index) => (
                  <TextInput
                    label={`Item ${index + 1}`}
                    value={item}
                    onChange={(val) => onUpdate(val)}
                    placeholder="Resume in MS Word or PDF format"
                  />
                )}
              />
            </div>
          </div>
        );

      case 'careerServices':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Our Career Services"
            />
            <TextArea
              label="Section Subtitle"
              value={sectionData?.subtitle}
              onChange={(val) => onChange('subtitle', val)}
              rows={2}
              placeholder="We help students become job-ready and successfully placed in the healthcare industry."
            />
            <ArrayEditor
              label="Service Items"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Service"
              defaultItem={{ id: '', icon: 'Briefcase', title: '', subtitle: '', description: '', fullDescription: '', highlights: [], imageUrl: '' }}
              renderItem={(item, onUpdate, index) => (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Service ID (URL Slug)"
                      value={item?.id}
                      onChange={(val) => onUpdate({ ...item, id: val })}
                      placeholder="job-placement-assistance"
                      hint="Used for the detail page URL (e.g., /careers/services/job-placement-assistance)"
                    />
                    <Select
                      label="Icon"
                      value={item?.icon || 'Briefcase'}
                      onChange={(val) => onUpdate({ ...item, icon: val })}
                      options={[
                        { value: 'Briefcase', label: 'Briefcase' },
                        { value: 'FileText', label: 'File Text' },
                        { value: 'Users', label: 'Users' },
                        { value: 'Target', label: 'Target' },
                        { value: 'GraduationCap', label: 'Graduation Cap' },
                        { value: 'Rocket', label: 'Rocket' },
                        { value: 'Award', label: 'Award' },
                        { value: 'Heart', label: 'Heart' },
                        { value: 'Clock', label: 'Clock' },
                        { value: 'CheckCircle', label: 'Check Circle' }
                      ]}
                    />
                  </div>
                  <TextInput
                    label="Title"
                    value={item?.title}
                    onChange={(val) => onUpdate({ ...item, title: val })}
                    placeholder="Job Placement Assistance"
                  />
                  <TextInput
                    label="Subtitle"
                    value={item?.subtitle}
                    onChange={(val) => onUpdate({ ...item, subtitle: val })}
                    placeholder="Connecting you with top healthcare employers"
                    hint="Short tagline displayed below the title"
                  />
                  <TextArea
                    label="Description"
                    value={item?.description}
                    onChange={(val) => onUpdate({ ...item, description: val })}
                    rows={2}
                    placeholder="We connect graduates with healthcare employers..."
                  />
                  <TextArea
                    label="Full Description"
                    value={item?.fullDescription}
                    onChange={(val) => onUpdate({ ...item, fullDescription: val })}
                    rows={4}
                    placeholder="Detailed description shown on the service detail page..."
                    hint="Detailed description shown on the service detail page"
                  />
                  <ArrayEditor
                    label="Highlights"
                    items={item?.highlights}
                    onChange={(val) => onUpdate({ ...item, highlights: val })}
                    addItemLabel="Add Highlight"
                    defaultItem=""
                    hint="List items shown under 'What's Included' on the detail page"
                    renderItem={(highlight, onHighlightUpdate, hIndex) => (
                      <TextInput
                        label=""
                        value={typeof highlight === 'string' ? highlight : highlight?.text || ''}
                        onChange={(val) => onHighlightUpdate(val)}
                        placeholder="e.g., Direct connections with healthcare employers"
                      />
                    )}
                  />
                </div>
              )}
            />
          </div>
        );

      case 'careerJourney':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Your Career Journey"
            />
            <TextArea
              label="Section Subtitle"
              value={sectionData?.subtitle}
              onChange={(val) => onChange('subtitle', val)}
              rows={2}
              placeholder="A clear path from education to employment — we guide you every step of the way."
            />
            <ArrayEditor
              label="Journey Steps"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Step"
              defaultItem={{ icon: 'GraduationCap', title: '', description: '' }}
              renderItem={(item, onUpdate, index) => (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Select
                    label="Icon"
                    value={item?.icon || 'GraduationCap'}
                    onChange={(val) => onUpdate({ ...item, icon: val })}
                    options={[
                      { value: 'GraduationCap', label: 'Graduation Cap' },
                      { value: 'Award', label: 'Award' },
                      { value: 'Briefcase', label: 'Briefcase' },
                      { value: 'Rocket', label: 'Rocket' },
                      { value: 'Target', label: 'Target' },
                      { value: 'Users', label: 'Users' },
                      { value: 'CheckCircle', label: 'Check Circle' }
                    ]}
                  />
                  <TextInput
                    label="Step Title"
                    value={item?.title}
                    onChange={(val) => onUpdate({ ...item, title: val })}
                    placeholder="Learn"
                  />
                  <TextInput
                    label="Description"
                    value={item?.description}
                    onChange={(val) => onUpdate({ ...item, description: val })}
                    placeholder="Enroll in our accredited programs"
                  />
                </div>
              )}
            />
          </div>
        );

      case 'employerConnections':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Employer Connections"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={3}
              placeholder="We maintain strong relationships with healthcare facilities, nursing homes, and home care providers across New Brunswick..."
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Key Points</h4>
              <ArrayEditor
                label="Points"
                items={sectionData?.points}
                onChange={(val) => onChange('points', val)}
                addItemLabel="Add Point"
                defaultItem=""
                renderItem={(item, onUpdate, index) => (
                  <TextInput
                    label={`Point ${index + 1}`}
                    value={item}
                    onChange={(val) => onUpdate(val)}
                    placeholder="Direct connections with healthcare employers"
                  />
                )}
              />
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Employer CTA Card</h4>
              <TextInput
                label="Card Title"
                value={sectionData?.ctaCard?.title}
                onChange={(val) => onChange('ctaCard', { ...sectionData?.ctaCard, title: val })}
                placeholder="For Healthcare Employers"
              />
              <TextArea
                label="Card Description"
                value={sectionData?.ctaCard?.description}
                onChange={(val) => onChange('ctaCard', { ...sectionData?.ctaCard, description: val })}
                rows={2}
                placeholder="Looking to hire qualified healthcare professionals? Partner with us..."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <TextInput
                  label="Button Text"
                  value={sectionData?.ctaCard?.buttonText}
                  onChange={(val) => onChange('ctaCard', { ...sectionData?.ctaCard, buttonText: val })}
                  placeholder="Partner With Us"
                />
                <TextInput
                  label="Button Link"
                  value={sectionData?.ctaCard?.buttonLink}
                  onChange={(val) => onChange('ctaCard', { ...sectionData?.ctaCard, buttonLink: val })}
                  placeholder="/contact"
                />
              </div>
            </div>
          </div>
        );

      case 'workshops':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Professional Workshops"
            />
            <ArrayEditor
              label="Workshops"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Workshop"
              defaultItem={{ id: '', title: '', description: '', duration: '' }}
              renderItem={(item, onUpdate, index) => (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                      label="Workshop ID"
                      value={item?.id}
                      onChange={(val) => onUpdate({ ...item, id: val })}
                      placeholder="whmis"
                    />
                    <TextInput
                      label="Title"
                      value={item?.title}
                      onChange={(val) => onUpdate({ ...item, title: val })}
                      placeholder="WHMIS Training"
                    />
                  </div>
                  <TextArea
                    label="Description"
                    value={item?.description}
                    onChange={(val) => onUpdate({ ...item, description: val })}
                    rows={2}
                    placeholder="Workshop description..."
                  />
                  <TextInput
                    label="Duration"
                    value={item?.duration}
                    onChange={(val) => onUpdate({ ...item, duration: val })}
                    placeholder="3 hours"
                  />
                </div>
              )}
            />
          </div>
        );

      case 'accreditations':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Accreditations & Partnerships"
            />
            <TextInput
              label="Subtitle"
              value={sectionData?.subtitle}
              onChange={(val) => onChange('subtitle', val)}
              placeholder="Registered under NB Private Occupational Training Act with licensed instructors."
            />
            <ArrayEditor
              label="Accreditations"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Accreditation"
              defaultItem={{ name: '', description: '' }}
              renderItem={(item, onUpdate, index) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <TextInput
                    label="Name"
                    value={item?.name}
                    onChange={(val) => onUpdate({ ...item, name: val })}
                    placeholder="NBAPCU"
                  />
                  <TextInput
                    label="Description"
                    value={item?.description}
                    onChange={(val) => onUpdate({ ...item, description: val })}
                    placeholder="New Brunswick Association of Personal Care Workers"
                  />
                </div>
              )}
            />
          </div>
        );

      case 'insurance':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Insurance Partners"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={2}
              placeholder="We work with various insurance providers..."
            />
            <ArrayEditor
              label="Insurance Partners"
              items={sectionData?.items}
              onChange={(val) => onChange('items', val)}
              addItemLabel="Add Partner"
              defaultItem={{ name: '', description: '' }}
              renderItem={(item, onUpdate, index) => (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <TextInput
                    label="Name"
                    value={item?.name}
                    onChange={(val) => onUpdate({ ...item, name: val })}
                    placeholder="Blue Cross"
                  />
                  <TextInput
                    label="Description"
                    value={item?.description}
                    onChange={(val) => onUpdate({ ...item, description: val })}
                    placeholder="Coverage description"
                  />
                </div>
              )}
            />
          </div>
        );

      case 'intro':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Professional Healthcare Education"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={3}
              placeholder="Care-Ed Learning Center is officially registered..."
            />
            <TextArea
              label="Additional Content"
              value={sectionData?.content}
              onChange={(val) => onChange('content', val)}
              rows={3}
              placeholder="Our goal is to provide research-based knowledge..."
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Statistics</h4>
              <ArrayEditor
                label="Stats"
                items={sectionData?.stats}
                onChange={(val) => onChange('stats', val)}
                addItemLabel="Add Stat"
                defaultItem={{ number: 0, suffix: '', label: '' }}
                renderItem={(item, onUpdate, index) => (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <TextInput
                      label="Number"
                      type="number"
                      value={item?.number}
                      onChange={(val) => onUpdate({ ...item, number: parseInt(val) || 0 })}
                      placeholder="15"
                    />
                    <TextInput
                      label="Suffix"
                      value={item?.suffix}
                      onChange={(val) => onUpdate({ ...item, suffix: val })}
                      placeholder="+"
                    />
                    <TextInput
                      label="Label"
                      value={item?.label}
                      onChange={(val) => onUpdate({ ...item, label: val })}
                      placeholder="Years of Training"
                    />
                  </div>
                )}
              />
            </div>
            <ImageUpload
              label="Section Image"
              value={sectionData?.images?.[0]}
              onChange={(val) => onChange('images', val ? [val] : [])}
              folder="images"
            />
          </div>
        );

      case 'instructors':
        return (
          <div className="space-y-6">
            <TextInput
              label="Section Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
              placeholder="Qualified Instructors"
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={3}
              placeholder="All our instructors hold current RN or LPN licenses..."
            />
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Features</h4>
              <ArrayEditor
                label="Instructor Features"
                items={sectionData?.features}
                onChange={(val) => onChange('features', val)}
                addItemLabel="Add Feature"
                defaultItem="New Feature"
                renderItem={(item, onUpdate, index) => (
                  <TextInput
                    label="Feature"
                    value={typeof item === 'string' ? item : item?.title}
                    onChange={(val) => onUpdate(val)}
                    placeholder="Current RN/LPN licenses"
                  />
                )}
              />
            </div>
            <ImageUpload
              label="Instructor Image"
              value={sectionData?.images?.[0]}
              onChange={(val) => onChange('images', val ? [val] : [])}
              folder="images"
            />
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <TextInput
              label="Title"
              value={sectionData?.title}
              onChange={(val) => onChange('title', val)}
            />
            <TextArea
              label="Description"
              value={sectionData?.description}
              onChange={(val) => onChange('description', val)}
              rows={4}
            />
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Error loading page: {error.message}
      </div>
    );
  }

  const currentSectionData = data?.sections?.[activeSection];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Status message */}
      {saveStatus.message && (
        <div
          className={`px-4 py-3 rounded-lg text-sm ${saveStatus.type === 'success'
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
            }`}
        >
          {saveStatus.message}
        </div>
      )}

      {/* API status indicator */}
      {fromApi ? (
        <div className="px-3 py-2 sm:px-4 sm:py-2 bg-green-50 border border-green-200 rounded-lg text-green-700 text-xs sm:text-sm flex items-center gap-2">
          <span className="w-2 h-2 flex-shrink-0 bg-green-500 rounded-full"></span>
          <span>Connected to API - Changes will be saved to database</span>
        </div>
      ) : (
        <div className="px-3 py-2 sm:px-4 sm:py-2 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-xs sm:text-sm flex items-center gap-2">
          <span className="w-2 h-2 flex-shrink-0 bg-yellow-500 rounded-full"></span>
          <span>Using static data - API unavailable. Changes will not persist.</span>
        </div>
      )}

      {/* Section tabs — desktop: scrollable horizontal tabs, mobile: dropdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

        {/* ── Mobile dropdown ── */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            aria-expanded={mobileMenuOpen}
          >
            <span className="flex items-center gap-2">
              {activeSectionName?.icon && <span>{activeSectionName.icon}</span>}
              <span>{activeSectionName?.name || 'Select Section'}</span>
            </span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {mobileMenuOpen && (
            <div className="border-t border-gray-200 divide-y divide-gray-100">
              {config.sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionSelect(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-left transition-colors ${activeSection === section.id
                    ? 'bg-secondary text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  {section.icon && <span>{section.icon}</span>}
                  {section.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Desktop horizontal scrollable tabs ── */}
        {/* <div className="hidden md:flex overflow-x-auto border-b border-gray-200">
          {config.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeSection === section.id
                ? 'bg-secondary text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {section.icon && <span>{section.icon}</span>}
              {section.name}
            </button>
          ))}
        </div> */}
        <div className="hidden md:flex flex-wrap border-b border-gray-200">
          {config.sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeSection === section.id
                ? 'bg-secondary text-white'
                : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
              {section.icon && <span>{section.icon}</span>}
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section editor */}
      {activeSection && (
        <SectionEditor
          sectionId={activeSection}
          sectionName={config.sections.find((s) => s.id === activeSection)?.name || activeSection}
          data={currentSectionData}
          onSave={handleSave}
          isLoading={false}
          renderFields={(formData, handleChange) =>
            renderSectionFields(activeSection, formData, handleChange)
          }
        />
      )}
    </div>
  );
};

export default PageEditor;