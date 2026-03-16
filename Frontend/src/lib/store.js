const KEYS = {
  staff: 'quiz_staff',
  students: 'quiz_students',
  quizzes: 'quiz_quizzes',
  results: 'quiz_results',
  session: 'quiz_session',
  violations: 'quiz_violations',
};

function get(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Session
export const getSession = () => get(KEYS.session, null);
export const setSession = (s) => set(KEYS.session, s);
export const clearSession = () => localStorage.removeItem(KEYS.session);

// Staff
export const getStaffList = () => get(KEYS.staff, []);
export const saveStaffList = (list) => set(KEYS.staff, list);

export const addStaff = (name) => {
  const list = getStaffList();
  const id = crypto.randomUUID();
  list.push({ id, name, approved: false, disabled: false });
  saveStaffList(list);
  return list;
};

export const toggleStaffApproval = (id) => {
  const list = getStaffList().map(s =>
    s.id === id ? { ...s, approved: !s.approved } : s
  );
  saveStaffList(list);
  return list;
};

export const toggleStaffDisabled = (id) => {
  const list = getStaffList().map(s =>
    s.id === id ? { ...s, disabled: !s.disabled } : s
  );
  saveStaffList(list);
  return list;
};

// Students
export const getStudents = () => get(KEYS.students, []);

export const registerStudent = (email) => {
  const list = getStudents();
  if (list.some(s => s.email === email)) return false;
  list.push({ email });
  set(KEYS.students, list);
  return true;
};

// Quizzes
export const getQuizzes = () => get(KEYS.quizzes, []);
export const saveQuizzes = (quizzes) => set(KEYS.quizzes, quizzes);

export const addQuiz = (quiz) => {
  const list = getQuizzes();
  list.push(quiz);
  saveQuizzes(list);
  return list;
};

export const updateQuiz = (quiz) => {
  const list = getQuizzes().map(q =>
    q.id === quiz.id ? quiz : q
  );
  saveQuizzes(list);
  return list;
};

export const getQuizById = (id) =>
  getQuizzes().find(q => q.id === id);

// Results
export const getResults = () => get(KEYS.results, []);

export const saveResult = (result) => {
  const list = getResults();
  list.push(result);
  set(KEYS.results, list);
  return list;
};

export const getResultsByStudent = (email) =>
  getResults().filter(r => r.studentEmail === email);

export const getResultsByQuiz = (quizId) =>
  getResults().filter(r => r.quizId === quizId);

export const getResultByStudentAndQuiz = (email, quizId) =>
  getResults().find(r =>
    r.studentEmail === email && r.quizId === quizId
  );