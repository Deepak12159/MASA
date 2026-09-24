import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [media, setMedia] = useState([]);
  const [members, setMembers] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [aboutContent, setAboutContent] = useState('');

  useEffect(() => {
    fetchEvents();
    fetchMedia();
    fetchMembers();
    fetchAchievements();
    fetchAboutContent();
  }, []);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
    if (!error && data) setEvents(data);
  };

  const fetchMedia = async () => {
    const { data, error } = await supabase.from('media').select('*'); 
    if (!error && data) setMedia(data);
  };

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('members').select('*');
    if (!error && data) setMembers(data);
  };

  const fetchAchievements = async () => {
    const { data, error } = await supabase.from('achievements').select('*');
    if (!error && data) setAchievements(data);
  };

  const fetchAboutContent = async () => {
    const { data, error } = await supabase.from('site_settings').select('value').eq('key', 'about_content').single();
    if (!error && data) {
      setAboutContent(data.value);
    }
  };

  const updateAboutContent = async (newContent) => {
    const { error } = await supabase.from('site_settings').update({ value: newContent }).eq('key', 'about_content');
    if (error) {
      alert("Error updating About section: " + error.message);
    } else {
      setAboutContent(newContent);
      alert("About section updated successfully!");
    }
  };

  const addEvent = async (event) => {
    const { data, error } = await supabase.from('events').insert([event]).select();
    if (error) {
      console.error("Error adding event:", error);
      alert("Database Error: " + error.message);
    } else if (data) {
      setEvents([...events, data[0]]);
    }
  };
  const updateEvent = async (id, updatedEvent) => {
    const { data, error } = await supabase.from('events').update(updatedEvent).eq('id', id).select();
    if (!error && data) setEvents(events.map(e => (e.id === id ? data[0] : e)));
  };
  const removeEvent = async (id) => {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (!error) setEvents(events.filter(e => e.id !== id));
  };
  
  const addMedia = async (item) => {
    const { data, error } = await supabase.from('media').insert([item]).select();
    if (error) {
      console.error("Error adding media:", error);
      alert("Database Error: " + error.message);
    } else if (data) {
      setMedia([...media, data[0]]);
    }
  };
  const updateMedia = async (id, updatedItem) => {
    const { data, error } = await supabase.from('media').update(updatedItem).eq('id', id).select();
    if (!error && data) setMedia(media.map(m => (m.id === id ? data[0] : m)));
  };
  const removeMedia = async (id) => {
    const { error } = await supabase.from('media').delete().eq('id', id);
    if (!error) setMedia(media.filter(m => m.id !== id));
  };

  // --- Members CRUD ---
  const addMember = async (member) => {
    const { data, error } = await supabase.from('members').insert([member]).select();
    if (!error && data) setMembers([...members, data[0]]);
  };
  const updateMember = async (id, updatedMember) => {
    const { data, error } = await supabase.from('members').update(updatedMember).eq('id', id).select();
    if (!error && data) setMembers(members.map(m => (m.id === id ? data[0] : m)));
  };
  const removeMember = async (id) => {
    const { error } = await supabase.from('members').delete().eq('id', id);
    if (!error) setMembers(members.filter(m => m.id !== id));
  };

  // --- Achievements CRUD ---
  const addAchievement = async (achievement) => {
    const { data, error } = await supabase.from('achievements').insert([achievement]).select();
    if (error) {
      console.error("Error adding achievement:", error);
      alert("Database Error: " + error.message);
    } else if (data) {
      setAchievements([...achievements, data[0]]);
    }
  };
  const updateAchievement = async (id, updatedAchievement) => {
    const { data, error } = await supabase.from('achievements').update(updatedAchievement).eq('id', id).select();
    if (error) {
      alert("Database Error: " + error.message);
    } else if (data) {
      setAchievements(achievements.map(a => (a.id === id ? data[0] : a)));
    }
  };
  const removeAchievement = async (id) => {
    const { error } = await supabase.from('achievements').delete().eq('id', id);
    if (error) {
      alert("Database Error: " + error.message);
    } else {
      setAchievements(achievements.filter(a => a.id !== id));
    }
  };

  // --- File Upload ---
  const uploadFile = async (file, folderName = 'uploads') => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folderName}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('maasa-media')
        .upload(filePath, file);

      if (error) {
        alert("Upload Error: " + error.message);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('maasa-media')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error.message);
      return null;
    }
  };

  return (
    <DataContext.Provider value={{ 
      events, media, members, achievements, aboutContent,
      addEvent, updateEvent, removeEvent, 
      addMedia, updateMedia, removeMedia,
      addMember, updateMember, removeMember,
      addAchievement, updateAchievement, removeAchievement,
      updateAboutContent,
      uploadFile
    }}>
      {children}
    </DataContext.Provider>
  );
};
