import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are valid (i.e. not empty, and not placeholder values)
const isConfigured = 
  supabaseUrl && 
  supabaseUrl !== 'https://your-supabase-project-id.supabase.co' && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-anon-public-key-here';

let supabase;

if (isConfigured) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.log('🔌 Connected to Supabase Cloud Database');
} else {
  console.warn(
    '⚠️ Supabase configuration is missing or using placeholder values. ' +
    'Falling back to Browser LocalStorage (Offline Mode). ' +
    'To connect your cloud database, copy .env.example to .env and fill in the values.'
  );

  // Implement a Mock Supabase client so the app runs smoothly out-of-the-box
  supabase = {
    isMock: true,
    auth: {
      getUser: async () => {
        const session = JSON.parse(localStorage.getItem('mock_session'));
        return { data: { user: session ? session.user : null }, error: null };
      },
      getSession: async () => {
        const session = JSON.parse(localStorage.getItem('mock_session'));
        return { data: { session }, error: null };
      },
      signUp: async ({ email, password }) => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        if (users.find(u => u.email === email)) {
          return { data: null, error: { message: 'User already exists.' } };
        }
        const newUser = { id: 'mock-' + Math.random().toString(36).substr(2, 9), email };
        users.push({ ...newUser, password });
        localStorage.setItem('mock_users', JSON.stringify(users));
        
        const session = { user: newUser, access_token: 'mock-token' };
        localStorage.setItem('mock_session', JSON.stringify(session));
        return { data: { user: newUser, session }, error: null };
      },
      signInWithPassword: async ({ email, password }) => {
        const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
          return { data: null, error: { message: 'Invalid login credentials' } };
        }
        const session = { user: { id: user.id, email: user.email }, access_token: 'mock-token' };
        localStorage.setItem('mock_session', JSON.stringify(session));
        return { data: { user: session.user, session }, error: null };
      },
      signOut: async () => {
        localStorage.removeItem('mock_session');
        return { error: null };
      },
      onAuthStateChange: (callback) => {
        // Trigger callback on load
        const session = JSON.parse(localStorage.getItem('mock_session'));
        const user = session ? session.user : null;
        callback(session ? 'SIGNED_IN' : 'SIGNED_OUT', session);
        
        // Listen to storage events for cross-tab updates
        const handler = (e) => {
          if (e.key === 'mock_session') {
            const newSession = JSON.parse(e.newValue);
            callback(newSession ? 'SIGNED_IN' : 'SIGNED_OUT', newSession);
          }
        };
        window.addEventListener('storage', handler);
        return {
          data: {
            subscription: {
              unsubscribe: () => window.removeEventListener('storage', handler)
            }
          }
        };
      }
    },
    // Mock database tables operations
    from: (tableName) => {
      if (tableName !== 'solved_logs' && tableName !== 'concept_notes') {
        throw new Error(`Mock table "${tableName}" is not supported`);
      }

      const getItems = () => {
        const session = JSON.parse(localStorage.getItem('mock_session'));
        if (!session || !session.user) return [];
        const userId = session.user.id;
        const allItems = JSON.parse(localStorage.getItem(`mock_${tableName}`) || '[]');
        return allItems.filter(item => item.user_id === userId);
      };

      const saveItems = (items) => {
        const session = JSON.parse(localStorage.getItem('mock_session'));
        if (!session || !session.user) return;
        const userId = session.user.id;
        const allItems = JSON.parse(localStorage.getItem(`mock_${tableName}`) || '[]');
        const otherItems = allItems.filter(item => item.user_id !== userId);
        localStorage.setItem(`mock_${tableName}`, JSON.stringify([...otherItems, ...items]));
      };

      return {
        select: (columns) => {
          return {
            eq: (col, val) => {
              const items = getItems();
              const filtered = items.filter(l => l[col] === val);
              
              return {
                order: (orderCol, { ascending = true } = {}) => {
                  const sorted = [...filtered].sort((a, b) => {
                    const valA = a[orderCol] || '';
                    const valB = b[orderCol] || '';
                    if (valA < valB) return ascending ? -1 : 1;
                    if (valA > valB) return ascending ? 1 : -1;
                    return 0;
                  });
                  return { data: sorted, error: null };
                },
                data: filtered,
                error: null
              };
            },
            data: getItems(),
            error: null
          };
        },
        insert: async (dataArray) => {
          const session = JSON.parse(localStorage.getItem('mock_session'));
          if (!session || !session.user) {
            return { data: null, error: { message: 'Unauthorized' } };
          }
          const userId = session.user.id;
          const currentItems = getItems();
          const newEntries = (Array.isArray(dataArray) ? dataArray : [dataArray]).map(item => ({
            id: 'mock-id-' + Math.random().toString(36).substr(2, 9),
            user_id: userId,
            created_at: new Date().toISOString(),
            ...item
          }));

          saveItems([...currentItems, ...newEntries]);
          return { data: newEntries, error: null };
        },
        update: async (updateData) => {
          return {
            eq: (col, val) => {
              const items = getItems();
              let updatedItems = [];
              const affected = [];

              items.forEach(item => {
                if (item[col] === val) {
                  const updated = { ...item, ...updateData };
                  updatedItems.push(updated);
                  affected.push(updated);
                } else {
                  updatedItems.push(item);
                }
              });

              saveItems(updatedItems);
              return { data: affected, error: null };
            }
          };
        },
        delete: async () => {
          return {
            eq: (col, val) => {
              const items = getItems();
              const remaining = items.filter(item => item[col] !== val);
              saveItems(remaining);
              return { data: null, error: null };
            }
          };
        }
      };
    }
  };
}

export default supabase;
export { isConfigured };
