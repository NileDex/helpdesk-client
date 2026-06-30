import { useState } from 'react'

const QUESTION_DICT = [
  {
    category: 'Admission',
    color: '#6366f1',
    items: [
      'What are the admission requirements?',
      'What is the JAMB cutoff mark?',
      'What JAMB subjects do I need for Engineering?',
      'What JAMB subjects do I need for Medicine?',
      'How do I apply for Post-UTME?',
    ],
  },
  {
    category: 'Fees',
    color: '#0891b2',
    items: [
      'How much is the school fee for Engineering?',
      'How much is the fee for Medicine and Pharmacy?',
      'What are the Arts and Management fees?',
      'How do I pay school fees on Remita?',
      'When is the fee payment deadline?',
    ],
  },
  {
    category: 'Exams',
    color: '#d97706',
    items: [
      'When is the exam timetable released?',
      'What are the exam rules?',
      'What is the RSU grading system?',
      'How do I register for carryover exams?',
    ],
  },
  {
    category: 'Results',
    color: '#16a34a',
    items: [
      'What CGPA do I need for First Class?',
      'What is the CGPA classification at RSU?',
      'How do I check my semester results?',
      'How do I request my official transcript?',
    ],
  },
  {
    category: 'Scholarships',
    color: '#9333ea',
    items: [
      'What scholarships are available at RSU?',
      'How do I apply for the NDDC scholarship?',
      'What is the PTDF scholarship?',
      'Tell me about the FGSB scholarship',
      'What CGPA do I need for a scholarship?',
    ],
  },
  {
    category: 'Courses & Faculties',
    color: '#be123c',
    items: [
      'What faculties are in RSU?',
      'What departments are in the Faculty of Engineering?',
      'What JAMB subjects do I need for Law?',
      'How do I register my courses?',
    ],
  },
  {
    category: 'Hostel',
    color: '#0f766e',
    items: [
      'How do I apply for hostel accommodation?',
      'What are the hostel rules?',
      'How much is the hostel fee?',
    ],
  },
  {
    category: 'Library',
    color: '#b45309',
    items: [
      'What are the library opening hours?',
      'What databases does the RSU library have?',
      'How many books can I borrow?',
      'How do I access the e-library?',
    ],
  },
  {
    category: 'Academic Calendar',
    color: '#475569',
    items: [
      'When does harmattan semester start?',
      'When are harmattan semester exams?',
      'When does rain semester begin?',
      'When is the long vacation?',
    ],
  },
  {
    category: 'Contacts',
    color: '#4f46e5',
    items: [
      'How do I contact the admissions office?',
      'What is the bursary contact?',
      'How do I reach student affairs?',
      'What is the RSU ICT support contact?',
    ],
  },
]

export default function QuestionDictionary({ onSelect }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2 chat-scroll">
      <p className="text-[11.5px] text-gray-400 text-center mb-1">
        Select a category, then tap a question to send it.
      </p>

      {QUESTION_DICT.map((group, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={group.category}
            className="border border-gray-100 rounded-xl overflow-hidden"
          >
            {/* Category toggle */}
            <button
              className="w-full flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: group.color }}
              />
              <span
                className="flex-1 text-[13px] font-semibold"
                style={{ color: group.color }}
              >
                {group.category}
              </span>
              <span
                className="text-[14px] font-semibold w-4 text-center"
                style={{ color: group.color }}
              >
                {isOpen ? '-' : '+'}
              </span>
            </button>

            {/* Questions */}
            {isOpen && (
              <ul className="border-t border-gray-100">
                {group.items.map((q, qi) => (
                  <li key={q} className={qi > 0 ? 'border-t border-gray-50' : ''}>
                    <button
                      className="w-full text-left px-4 py-2.5 text-[12.5px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors leading-snug"
                      onClick={() => onSelect(q)}
                    >
                      {q}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
    </div>
  )
}
