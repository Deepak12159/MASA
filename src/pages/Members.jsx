import React, { useContext } from 'react';
import { Shield, Star, Users, GraduationCap } from 'lucide-react';
import { DataContext } from '../context/DataContext';
import './Home.css'; // For common section styles

const MemberCard = ({ member, icon: Icon, color }) => (
  <div className="spotlight-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderRadius: '1rem' }}>
    {member.image ? (
      <div style={{ width: '60px', height: '60px', borderRadius: '50%', flexShrink: 0, overflow: 'hidden' }}>
        <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    ) : (
      <div className={`icon-pulse bg-${color}`} style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon size={24} />
      </div>
    )}
    <div>
      <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'white' }}>{member.name}</h3>
      <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem' }}>{member.role}</p>
      <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.5rem', borderRadius: '1rem', display: 'inline-block', marginTop: '0.4rem', color: '#cbd5e1' }}>
        {member.dept_or_year}
      </span>
    </div>
  </div>
);

const MemberSection = ({ title, icon: Icon, color, members }) => {
  if (!members || members.length === 0) return null;

  return (
    <div style={{ marginBottom: '3rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className={`text-${color}`}><Icon size={24} /></div>
        <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600', color: 'white' }}>{title} ({members.length})</h3>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {members.map((m, i) => <MemberCard key={i} member={m} icon={Icon} color={color} />)}
      </div>
    </div>
  );
};

const Members = () => {
  const { members } = useContext(DataContext);

  const faculty = members.filter(m => m.category === 'faculty');
  const core = members.filter(m => m.category === 'core');
  const team = members.filter(m => m.category === 'team');
  const alumni = members.filter(m => m.category === 'alumni');

  return (
    <div className="container" style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '80vh' }}>
      <div className="section-header-modern" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 className="text-gradient">The MAASA Family</h2>
        <p>Meet the dedicated faculty, students, and alumni behind Medicaps University's thriving sports culture.</p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <MemberSection
          title="Faculty Coordinators"
          icon={Shield}
          color="blue"
          members={faculty}
        />

        <MemberSection
          title="Core Members"
          icon={Star}
          color="purple"
          members={core}
        />

        <MemberSection
          title="Alumni Directory"
          icon={GraduationCap}
          color="orange"
          members={alumni}
        />

        {members.length === 0 && (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '3rem' }}>
            No members have been added yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
