import React, { useState } from 'react';
import { Shield, Star, Users, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import './Home.css'; // For common section styles

const dummyData = {
  faculty: [
    { name: "Prof. Raj Sharma", role: "Head of Sports", dept: "Physical Education" },
    { name: "Dr. Anita Verma", role: "Athletics Coach", dept: "Sports Science" },
    { name: "Mr. Anil Kapoor", role: "Fitness Trainer", dept: "Physical Education" },
    { name: "Dr. Sunita Rao", role: "Sports Coordinator", dept: "Management" }
  ],
  core: [
    { name: "Aman Gupta", role: "President", year: "4th Year" },
    { name: "Riya Singh", role: "Vice President", year: "4th Year" },
    { name: "Vikash Kumar", role: "Secretary", year: "3rd Year" },
    { name: "Neha Patel", role: "Joint Secretary", year: "3rd Year" },
  ],
  team: [
    { name: "Rahul Dev", role: "Event Coordinator", year: "2nd Year" },
    { name: "Simran Kaur", role: "Media Head", year: "2nd Year" },
    { name: "Karan Johar", role: "Volunteer", year: "1st Year" },
    { name: "Pooja Mishra", role: "Volunteer", year: "1st Year" },
  ],
  alumni: [
    { name: "Rahul Dravid", role: "Former President", year: "Batch of 2023" },
    { name: "Suresh Raina", role: "Former Captain", year: "Batch of 2022" },
    { name: "Mitali Raj", role: "Former VP", year: "Batch of 2021" },
    { name: "MS Dhoni", role: "Former Secretary", year: "Batch of 2020" },
    { name: "Virat Kohli", role: "Former Event Head", year: "Batch of 2019" },
    { name: "Rohit Sharma", role: "Alumni Member", year: "Batch of 2018" },
    { name: "Smriti Mandhana", role: "Former Media Head", year: "Batch of 2017" },
    { name: "Jasprit Bumrah", role: "Alumni Member", year: "Batch of 2016" }
  ]
};

const MemberCard = ({ member, icon: Icon, color }) => (
  <div className="spotlight-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: '1rem' }}>
    <div className={`icon-pulse bg-${color}`} style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon size={24} />
    </div>
    <div>
      <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'white' }}>{member.name}</h3>
      <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>{member.role}</p>
      <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '1rem', display: 'inline-block', marginTop: '0.4rem', color: '#cbd5e1' }}>
        {member.dept || member.year}
      </span>
    </div>
  </div>
);

const AccordionSection = ({ title, icon: Icon, color, members, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '1rem', overflow: 'hidden', transition: 'all 0.3s ease' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%', padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: isOpen ? 'rgba(255,255,255,0.03)' : 'transparent', border: 'none', color: 'white', cursor: 'pointer', textAlign: 'left',
          transition: 'all 0.2s ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div className={`text-${color}`}><Icon size={24} /></div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>{title} ({members.length})</h3>
        </div>
        <div style={{ color: '#94a3b8' }}>
          {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </div>
      </button>

      {isOpen && (
        <div style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {members.map((m, i) => <MemberCard key={i} member={m} icon={Icon} color={color} />)}
        </div>
      )}
    </div>
  );
};

const Members = () => {
  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '80vh' }}>
      <div className="section-header-modern" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="text-gradient">The MASA Family</h2>
        <p>Meet the dedicated faculty, students, and alumni behind Medicaps University's thriving sports culture.</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <AccordionSection
          title="Faculty Coordinators"
          icon={Shield}
          color="blue"
          members={dummyData.faculty}
          defaultOpen={true}
        />

        <AccordionSection
          title="Core Members (3rd & 4th Year)"
          icon={Star}
          color="purple"
          members={dummyData.core}
          defaultOpen={false}
        />

        <AccordionSection
          title="Team Members (1st & 2nd Year)"
          icon={Users}
          color="green"
          members={dummyData.team}
          defaultOpen={false}
        />

        <AccordionSection
          title="Alumni Directory"
          icon={GraduationCap}
          color="orange"
          members={dummyData.alumni}
          defaultOpen={false}
        />
      </div>
    </div>
  );
};

export default Members;
