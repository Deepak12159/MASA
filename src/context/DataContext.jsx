import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

// Initial dummy data with Unsplash images
const initialEvents = [
  { id: 1, title: 'Inter-College Cricket Tournament', status: 'ongoing', date: '2026-10-15', participants: '500+', desc: 'Official Medicaps tournament dedicated to advancing sportsmanship.', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800' },
  { id: 2, title: 'Annual Athletics Meet', status: 'upcoming', date: '2026-11-20', participants: '800+', desc: 'Registrations open for all track & field events.', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800' },
  { id: 3, title: 'State Level Basketball', status: 'archive', date: '2025-08-10', participants: '200+', desc: 'Our men\'s team secured 1st position.', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800' },
];

const initialMedia = [
  { id: 1, type: 'photo', title: 'Cricket Finals', url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800' },
  { id: 2, type: 'photo', title: 'Track and Field', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800' },
  { id: 3, type: 'photo', title: 'Basketball Team', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=800' },
  { id: 4, type: 'photo', title: 'Football Match', url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=800' },
];

export const DataProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('maasa_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [media, setMedia] = useState(() => {
    const saved = localStorage.getItem('maasa_media');
    return saved ? JSON.parse(saved) : initialMedia;
  });

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('maasa_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('maasa_media', JSON.stringify(media));
  }, [media]);

  const addEvent = (event) => setEvents([...events, { ...event, id: Date.now() }]);
  const removeEvent = (id) => setEvents(events.filter(e => e.id !== id));
  
  const addMedia = (item) => setMedia([...media, { ...item, id: Date.now() }]);
  const removeMedia = (id) => setMedia(media.filter(m => m.id !== id));

  return (
    <DataContext.Provider value={{ events, media, addEvent, removeEvent, addMedia, removeMedia }}>
      {children}
    </DataContext.Provider>
  );
};
