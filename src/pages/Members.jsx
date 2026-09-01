import React from 'react';
import { Shield, Star, Users } from 'lucide-react';
import './Home.css'; // For common section styles

const dummyData = {
  faculty: [
    { name: "Prof. Raj Sharma", role: "Head of Sports", dept: "Physical Education" },
    { name: "Dr. Anita Verma", role: "Athletics Coach", dept: "Sports Science" },
  ],
  core4: [
    { name: "Aman Gupta", role: "President", year: "4th Year" },
    { name: "Riya Singh", role: "Vice President", year: "4th Year" },
  ],
  core3: [
    { name: "Vikash Kumar", role: "Secretary", year: "3rd Year" },
    { name: "Neha Patel", role: "Joint Secretary", year: "3rd Year" },
  ],
  team2: [
    { name: "Rahul Dev", role: "Event Coordinator", year: "2nd Year" },
    { name: "Simran Kaur", role: "Media Head", year: "2nd Year" },
  ],
  team1: [
    { name: "Karan Johar", role: "Volunteer", year: "1st Year" },
    { name: "Pooja Mishra", role: "Volunteer", year: "1st Year" },
  ]
};

const MemberCard = ({ member, icon: Icon, color }) => (
  <div className="spotlight-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: '1rem' }}>
    <div className={`icon-pulse bg-${color}`} style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={24} />
    </div>
    <div>
      <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'white' }}>{member.name}</h3>
      <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>{member.role}</p>
      <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '1rem', display: 'inline-block', marginTop: '0.4rem' }}>
        {member.dept || member.year}
      </span>
    </div>
  </div>
);

const Members = () => {
  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
      <div className="section-header-modern" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="text-gradient">The MASA Family</h2>
        <p>Meet the dedicated faculty and student members behind Medicaps University's thriving sports culture.</p>
      </div>

      <section style={{ marginBottom: '4rem' }}>
        <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Shield className="text-blue" /> Faculty Coordinators
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {dummyData.faculty.map((m, i) => <MemberCard key={i} member={m} icon={Shield} color="blue" />)}
        </div>
      </section>

      <section style={{ marginBottom: '4rem' }}>
        <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star className="text-purple" /> Core Members (4th & 3rd Year)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {dummyData.core4.map((m, i) => <MemberCard key={i} member={m} icon={Star} color="purple" />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {dummyData.core3.map((m, i) => <MemberCard key={i} member={m} icon={Star} color="purple" />)}
        </div>
      </section>

      <section>
        <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Users className="text-green" /> Team Members (2nd & 1st Year)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
          {dummyData.team2.map((m, i) => <MemberCard key={i} member={m} icon={Users} color="green" />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {dummyData.team1.map((m, i) => <MemberCard key={i} member={m} icon={Users} color="green" />)}
        </div>
      </section>
    </div>
  );
};

export default Members;
