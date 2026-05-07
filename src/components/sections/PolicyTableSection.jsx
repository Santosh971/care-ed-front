import AnimatedSection from '../AnimatedSection';

const PolicyTableSection = ({ section }) => {
  if (!section || section.isActive === false) return null;

  const { title, subtitle, description, headers = [], rows = [] } = section;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fade-up">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </AnimatedSection>

        <AnimatedSection animation="fade-up" delay={100}>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white">
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-left font-semibold"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-6 py-4 text-gray-700 border-b border-gray-200"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {description && (
            <p className="text-gray-500 text-sm text-center mt-4 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PolicyTableSection;