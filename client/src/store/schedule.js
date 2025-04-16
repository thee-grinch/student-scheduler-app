import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useEventsStore } from './events';
import { useTimetableStore } from './timetable';

export const useScheduleStore = defineStore('schedule', () => {
  const days = ref([]);
  const eventsStore = useEventsStore();
  const timetableStore = useTimetableStore();

  // Function to get the day name from a date string
  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  // Function to generate days with activities
  const generateSchedule = async () => {
    // Fetch events and timetable data
    await eventsStore.fetchEvents();
    await timetableStore.fetchTimetable();

    const today = new Date();
    const allEvents = eventsStore.events;
    const allTimetableEntries = timetableStore.timetable;

    days.value = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];
      const dayName = getDayName(formattedDate);

      // Filter events matching the date
      const events = allEvents
        .filter(
          (event) =>
            new Date(event.date).toISOString().split('T')[0] === formattedDate
        )
        .map((event) => ({
          id: event._id,
          title: event.title,
          time: event.time,
          type: 'event',
        }));

      // Filter timetable entries matching the day name
      const timetableEntries = allTimetableEntries
        .filter(
          (classItem) =>
            classItem.day.toLowerCase() === dayName.toLowerCase()
        )
        .map((classItem) => ({
          id: classItem._id,
          title: classItem.subject,
          time: `${classItem.startTime} - ${classItem.endTime}`,
          type: 'class',
        }));

      return {
        date: formattedDate,
        activities: [...events, ...timetableEntries],
      };
    });
  };

  // Computed property for today's activities
  const todaysActivities = computed(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayData = days.value.find((day) => day.date === today);
    return todayData ? todayData.activities : [];
  });

  return { days, generateSchedule, todaysActivities };
});