// Courses Data
let courses = [
    {
        id: 1,
        name: 'Web Design',
        icon: '🌐',
        description: 'Master modern web design with HTML, CSS, and responsive layouts. Create stunning websites from scratch.',
        duration: '3 months',
        level: 'Beginner'
    },
    {
        id: 2,
        name: 'Graphic Design',
        icon: '🎨',
        description: 'Learn professional graphic design principles, Adobe Creative Suite, and create amazing visual content.',
        duration: '4 months',
        level: 'Intermediate'
    },
    {
        id: 3,
        name: 'Digital Marketing',
        icon: '📱',
        description: 'Master SEO, social media marketing, content strategy, and analytics to grow businesses online.',
        duration: '2 months',
        level: 'Beginner'
    },
    {
        id: 4,
        name: 'Generative AI',
        icon: '🤖',
        description: 'Explore AI tools like ChatGPT, Midjourney, and learn to leverage AI for creative and business solutions.',
        duration: '3 months',
        level: 'Intermediate'
    },
    {
        id: 5,
        name: 'AI/ML Learning',
        icon: '🧠',
        description: 'Deep dive into machine learning algorithms, neural networks, and build intelligent applications.',
        duration: '6 months',
        level: 'Advanced'
    },
    {
        id: 6,
        name: 'DSA',
        icon: '📊',
        description: 'Master Data Structures and Algorithms. Prepare for top tech interviews and competitive programming.',
        duration: '4 months',
        level: 'Intermediate'
    },
    {
        id: 7,
        name: 'Java Learning',
        icon: '☕',
        description: 'Learn Java programming from basics to advanced. Build enterprise-level applications and Android apps.',
        duration: '5 months',
        level: 'Beginner'
    },
    {
        id: 8,
        name: 'Python Learning',
        icon: '🐍',
        description: 'Master Python programming for web development, data science, automation, and AI applications.',
        duration: '4 months',
        level: 'Beginner'
    },
    {
        id: 9,
        name: 'Data Analyst',
        icon: '📈',
        description: 'Learn data analysis, visualization, SQL, Excel, and Python. Transform data into actionable insights.',
        duration: '3 months',
        level: 'Intermediate'
    },
    {
        id: 10,
        name: 'Accounting with AI',
        icon: '💰',
        description: 'Modern accounting practices integrated with AI tools. Learn bookkeeping, taxation, and financial analysis.',
        duration: '3 months',
        level: 'Beginner'
    },
    {
        id: 11,
        name: 'Cybersecurity',
        icon: '🔒',
        description: 'Learn ethical hacking, network security, penetration testing, and protect systems from cyber threats.',
        duration: '5 months',
        level: 'Advanced'
    },
    {
        id: 12,
        name: 'Cloud Computing',
        icon: '☁️',
        description: 'Master AWS, Azure, Google Cloud. Learn cloud architecture, deployment, and DevOps practices.',
        duration: '4 months',
        level: 'Intermediate'
    },
    {
        id: 13,
        name: 'Blockchain',
        icon: '⛓️',
        description: 'Learn blockchain technology, smart contracts, cryptocurrency, and build decentralized applications (DApps).',
        duration: '5 months',
        level: 'Advanced'
    },
    {
        id: 14,
        name: 'UI/UX Design',
        icon: '🎨',
        description: 'Master user interface and user experience design with Figma, Adobe XD, and create beautiful user-centric designs.',
        duration: '3 months',
        level: 'Beginner'
    },
    {
        id: 15,
        name: 'Mobile App Development',
        icon: '📱',
        description: 'Build native and cross-platform mobile apps using React Native, Flutter, and publish to App Store & Play Store.',
        duration: '6 months',
        level: 'Intermediate'
    },
    {
        id: 16,
        name: 'Full Stack Development',
        icon: '💻',
        description: 'Become a complete web developer. Master frontend, backend, databases, and deployment. Build full-scale web applications.',
        duration: '8 months',
        level: 'Advanced'
    }
];

// Load courses from localStorage
function loadCoursesFromStorage() {
    const savedCourses = localStorage.getItem('courses');
    if (savedCourses) {
        courses = JSON.parse(savedCourses);
    }
}

// Save courses to localStorage
function saveCoursesToStorage() {
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCoursesFromStorage(); // YEH LINE ADD KARO
    checkLoginStatus();
    renderCourses();
    setupEventListeners();

    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 2000);
});

// Check Login Status
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        showLoggedInState(currentUser);
    }
}

// Show Logged In State
function showLoggedInState(user) {
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('signupBtn').style.display = 'none';
    document.getElementById('userIcon').style.display = 'flex';
    document.getElementById('userGreeting').textContent = 'Hi ' + user.name;

    if (user.role === 'admin') {
        document.getElementById('heartBtn').style.display = 'none';
        document.getElementById('editCoursesBtn').style.display = 'block';
        document.getElementById('editCoursesBtn').innerHTML = '✏️ Manage All Courses';
    } else if (user.role === 'tutor') {
        document.getElementById('heartBtn').style.display = 'none';
        document.getElementById('editCoursesBtn').style.display = 'block';
        document.getElementById('editCoursesBtn').innerHTML = '📚 My Courses';
    } else {
        document.getElementById('heartBtn').style.display = 'block';
        document.getElementById('editCoursesBtn').style.display = 'none';
    }
}

// Show Logged Out State
function showLoggedOutState() {
    document.getElementById('loginBtn').style.display = 'block';
    document.getElementById('signupBtn').style.display = 'block';
    document.getElementById('userIcon').style.display = 'none';
    document.getElementById('heartBtn').style.display = 'none';
    document.getElementById('editCoursesBtn').style.display = 'none';
    document.getElementById('userGreeting').textContent = '';
}

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('loginBtn').addEventListener('click', () => {
        openPanel('loginPanel');
    });

    document.getElementById('signupBtn').addEventListener('click', () => {
        openPanel('signupPanel');
    });

    document.getElementById('userIcon').addEventListener('click', () => {
        openProfile();
    });

    document.getElementById('heartBtn').addEventListener('click', () => {
        showLikedCourses();
    });

    document.getElementById('editCoursesBtn').addEventListener('click', () => {
        openEditCoursesPanel();
    });

    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);

    document.getElementById('forgetLink').addEventListener('click', (e) => {
        e.preventDefault();
        closePanel('loginPanel');
        openPanel('forgetPanel');
    });

    document.getElementById('forgetForm').addEventListener('submit', handleForgetPassword);
}

// Open Panel
function openPanel(panelId) {
    document.getElementById(panelId).classList.add('active');
}

// Close Panel
function closePanel(panelId) {
    document.getElementById(panelId).classList.remove('active');

    if (panelId === 'likedPanel') {
        renderCourses();
    }
}

// Toggle Password Visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === 'password' ? 'text' : 'password';
}

// Handle Signup
function handleSignup(e) {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const retypePassword = document.getElementById('signupRetypePassword').value;

    if (password !== retypePassword) {
        alert('Passwords do not match!');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(u => u.email === email)) {
        alert('User already exists with this email!');
        return;
    }

    const role = document.querySelector('input[name="userRole"]:checked').value;

    const newUser = {
        name,
        email,
        phone,
        password,
        role: role,
        likedCourses: [],
        addedCourses: [] // Tutor ke courses track karne ke liye
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    showSuccessMessage('Account Created Successfully! 🎉');

    closePanel('signupPanel');
    document.getElementById('signupForm').reset();

    setTimeout(() => {
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        showLoggedInState(newUser);
    }, 2000);
}

// Handle Login
function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (email === 'admin@example.com' && password === 'admin') {
        const admin = { name: 'Admin', email, role: 'admin' };
        localStorage.setItem('currentUser', JSON.stringify(admin));
        showLoggedInState(admin);
        showSuccessMessage('Admin Login Successful! 👨‍💼');
        closePanel('loginPanel');
        document.getElementById('loginForm').reset();
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showLoggedInState(user);
        showSuccessMessage('Login Successful! 🎉');
        closePanel('loginPanel');
        document.getElementById('loginForm').reset();
    } else {
        alert('Invalid email or password!');
    }
}

// Handle Forget Password
function handleForgetPassword(e) {
    e.preventDefault();

    const phone = document.getElementById('forgetPhone').value;
    const newPassword = document.getElementById('forgetPassword').value;
    const retypePassword = document.getElementById('forgetRetypePassword').value;

    if (newPassword !== retypePassword) {
        alert('Passwords do not match!');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.phone === phone);

    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        showSuccessMessage('Password Reset Successfully! ✅');
        closePanel('forgetPanel');
        document.getElementById('forgetForm').reset();
    } else {
        alert('Phone number does not exist!');
    }
}

// Show Success Message
function showSuccessMessage(message) {
    const successMsg = document.getElementById('successMsg');
    document.getElementById('successText').textContent = message;
    successMsg.classList.add('show');

    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 2500);
}

// Render Courses (UPDATE THIS FUNCTION)
function renderCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    coursesGrid.innerHTML = courses.map(course => {
        const isLiked = currentUser && currentUser.likedCourses &&
            currentUser.likedCourses.includes(course.id);

        return `
            <div class="course-card">
                <div class="course-header">
                    <span class="course-icon">${course.icon}</span>
                    <span class="heart-course ${isLiked ? 'liked' : ''}" 
                          onclick="toggleLike(${course.id})">
                        ${isLiked ? '❤' : '♡'}
                    </span>
                </div>
                <h3>${course.name}</h3>
                <p>${course.description}</p>
                <div class="course-details">
                    <span class="course-tag">⏱ ${course.duration}</span>
                    <span class="course-tag">📚 ${course.level}</span>
                </div>
                <button class="btn-primary" style="width: 100%; margin-top: 1rem;" 
                        onclick="showCourseDetails(${course.id})">
                    📖 View Details
                </button>
            </div>
        `;
    }).join('');
}

// Toggle Like
function toggleLike(courseId) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert('Please login to like courses!');
        return;
    }

    if (currentUser.role === 'admin') {
        alert('Admin cannot like courses!');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(u => u.email === currentUser.email);

    if (userIndex !== -1) {
        if (!users[userIndex].likedCourses) {
            users[userIndex].likedCourses = [];
        }

        const likedIndex = users[userIndex].likedCourses.indexOf(courseId);

        if (likedIndex === -1) {
            users[userIndex].likedCourses.push(courseId);
        } else {
            users[userIndex].likedCourses.splice(likedIndex, 1);
        }

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        renderCourses();
    }
}

// Show Liked Courses
function showLikedCourses() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || !currentUser.likedCourses) {
        return;
    }

    const likedCoursesContainer = document.getElementById('likedCourses');
    const likedCourses = courses.filter(c => currentUser.likedCourses.includes(c.id));

    if (likedCourses.length === 0) {
        likedCoursesContainer.innerHTML = '<p>No liked courses yet!</p>';
    } else {
        likedCoursesContainer.innerHTML = likedCourses.map(course => `
            <div class="liked-course-card">
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="font-size: 2rem;">${course.icon}</span>
                    <div>
                        <h3>${course.name}</h3>
                        <p>${course.description}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    openPanel('likedPanel');
}

// Open Edit Courses Panel (Admin)
function openEditCoursesPanel() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const coursesList = document.getElementById('coursesList');

    // Admin ke liye - sabhi courses dikhaao
    if (currentUser.role === 'admin') {
        coursesList.innerHTML = `
            <button class="btn-primary" style="width: 100%; margin-bottom: 2rem;" onclick="openAddCourseModal()">
                ➕ Add New Course
            </button>
            
            ${courses.map((course, index) => {
                const addedBy = course.addedBy || 'Admin';
                const likedCount = getLikedCount(course.id);
                
                return `
                    <div class="course-management-card">
                        <div style="display: flex; gap: 1rem; align-items: center;">
                            <span style="font-size: 2.5rem;">${course.icon}</span>
                            <div style="flex: 1;">
                                <h4 style="margin: 0 0 0.3rem 0; color: var(--dark-purple);">${course.name}</h4>
                                <p style="margin: 0 0 0.5rem 0; color: var(--text-dark); font-size: 0.9rem;">${course.description.substring(0, 60)}...</p>
                                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                    <span class="course-tag">⏱ ${course.duration}</span>
                                    <span class="course-tag">📚 ${course.level}</span>
                                    <span class="course-tag">👨‍🏫 ${addedBy}</span>
                                    <span class="course-tag">❤️ ${likedCount} Likes</span>
                                </div>
                            </div>
                        </div>
                        <div style="display: flex; gap: 0.8rem; margin-top: 1rem;">
                            <button class="btn-admin-edit" onclick="openEditCourseModal(${index})">
                                <span>✏️</span> Edit
                            </button>
                            <button class="btn-admin-delete" onclick="deleteCourse(${index})">
                                <span>🗑️</span> Delete
                            </button>
                            <button class="btn-admin-edit" onclick="showCourseLikes(${course.id})">
                                <span>👥</span> View Likes
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        `;
    } 
    // Tutor ke liye - sirf apne courses dikhaao
    else if (currentUser.role === 'tutor') {
        const tutorCourses = courses.filter(c => c.addedBy === currentUser.email);
        
        coursesList.innerHTML = `
            <button class="btn-primary" style="width: 100%; margin-bottom: 2rem;" onclick="openAddCourseModal()">
                ➕ Add New Course
            </button>
            
            ${tutorCourses.length === 0 ? 
                '<div style="text-align: center; padding: 2rem; color: var(--medium-purple);">You haven\'t added any courses yet!</div>' :
                tutorCourses.map((course) => {
                    const realIndex = courses.findIndex(c => c.id === course.id);
                    const likedCount = getLikedCount(course.id);
                    
                    return `
                        <div class="course-management-card">
                            <div style="display: flex; gap: 1rem; align-items: center;">
                                <span style="font-size: 2.5rem;">${course.icon}</span>
                                <div style="flex: 1;">
                                    <h4 style="margin: 0 0 0.3rem 0; color: var(--dark-purple);">${course.name}</h4>
                                    <p style="margin: 0 0 0.5rem 0; color: var(--text-dark); font-size: 0.9rem;">${course.description.substring(0, 60)}...</p>
                                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                        <span class="course-tag">⏱ ${course.duration}</span>
                                        <span class="course-tag">📚 ${course.level}</span>
                                        <span class="course-tag">❤️ ${likedCount} Likes</span>
                                    </div>
                                </div>
                            </div>
                            <div style="display: flex; gap: 0.8rem; margin-top: 1rem;">
                                <button class="btn-admin-edit" onclick="openEditCourseModal(${realIndex})">
                                    <span>✏️</span> Edit
                                </button>
                                <button class="btn-admin-delete" onclick="deleteCourse(${realIndex})">
                                    <span>🗑️</span> Delete
                                </button>
                                <button class="btn-admin-edit" onclick="showCourseLikes(${course.id})">
                                    <span>👥</span> View Likes
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')
            }
        `;
    }

    openPanel('editCoursesPanel');
}

// Open Add Course Modal
function openAddCourseModal() {
    const modal = document.getElementById('courseModal');
    document.getElementById('modalTitle').textContent = 'Add New Course';
    document.getElementById('courseForm').reset();

    document.getElementById('courseForm').onsubmit = (e) => {
        e.preventDefault();
        addNewCourse();
    };

    modal.style.display = 'flex';
}

// Open Edit Course Modal
function openEditCourseModal(index) {
    const course = courses[index];
    const modal = document.getElementById('courseModal');

    document.getElementById('modalTitle').textContent = 'Edit Course';
    document.getElementById('courseName').value = course.name;
    document.getElementById('courseIcon').value = course.icon;
    document.getElementById('courseDescription').value = course.description;
    document.getElementById('courseDuration').value = course.duration;
    document.getElementById('courseLevel').value = course.level;

    document.getElementById('courseForm').onsubmit = (e) => {
        e.preventDefault();
        updateCourse(index);
    };

    modal.style.display = 'flex';
}

// Add New Course
function addNewCourse() {
    const name = document.getElementById('courseName').value;
    const icon = document.getElementById('courseIcon').value;
    const description = document.getElementById('courseDescription').value;
    const duration = document.getElementById('courseDuration').value;
    const level = document.getElementById('courseLevel').value;

    if (!name || !icon || !description || !duration || !level) {
        alert('All fields are required!');
        return;
    }

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const newCourse = {
        id: Math.max(...courses.map(c => c.id), 0) + 1,
        name,
        icon,
        description,
        duration,
        level,
        addedBy: currentUser.role === 'tutor' ? currentUser.email : 'Admin'
    };

    courses.push(newCourse);
    saveCoursesToStorage(); // YEH LINE ADD KARO
    showSuccessMessage('Course "' + name + '" added successfully! 🎉');
    closeCourseModal();
    renderCourses();
    setTimeout(() => {
        openEditCoursesPanel();
    }, 2500);
}

// Update Course
function updateCourse(index) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const course = courses[index];

    // Check if tutor is trying to edit someone else's course
    if (currentUser.role === 'tutor' && course.addedBy !== currentUser.email) {
        alert('You can only edit your own courses!');
        return;
    }

    const name = document.getElementById('courseName').value;
    const icon = document.getElementById('courseIcon').value;
    const description = document.getElementById('courseDescription').value;
    const duration = document.getElementById('courseDuration').value;
    const level = document.getElementById('courseLevel').value;

    if (!name || !icon || !description || !duration || !level) {
        alert('All fields are required!');
        return;
    }

    courses[index] = {
        ...courses[index],
        name,
        icon,
        description,
        duration,
        level
    };

    saveCoursesToStorage(); // YEH LINE ADD KARO
    showSuccessMessage('Course "' + name + '" updated successfully! ✅');
    closeCourseModal();
    renderCourses();
    setTimeout(() => {
        openEditCoursesPanel();
    }, 2500);
}

// Delete Course
function deleteCourse(index) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const course = courses[index];

    // Check if tutor is trying to delete someone else's course
    if (currentUser.role === 'tutor' && course.addedBy !== currentUser.email) {
        alert('You can only delete your own courses!');
        return;
    }

    if (confirm('Are you sure you want to delete "' + courses[index].name + '"?')) {
        const deletedName = courses[index].name;
        courses.splice(index, 1);
        saveCoursesToStorage(); // YEH LINE ADD KARO
        showSuccessMessage('Course "' + deletedName + '" deleted successfully! 🗑️');
        renderCourses();
        setTimeout(() => {
            openEditCoursesPanel();
        }, 2500);
    }
}

// Close Course Modal
function closeCourseModal() {
    document.getElementById('courseModal').style.display = 'none';
}

// Open Profile
// Open Profile
function openProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) return;

    const profileSection = document.getElementById('profileSection');

    if (currentUser.role === 'admin') {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const tutorCount = users.filter(u => u.role === 'tutor').length;
        const studentCount = users.filter(u => u.role === 'student' || !u.role).length;

        profileSection.innerHTML = `
            <div class="admin-header">
                <div class="admin-avatar">
                    <span class="admin-icon">👨‍💼</span>
                </div>
                <div class="admin-info">
                    <h2>Admin Dashboard</h2>
                    <p class="admin-email">${currentUser.email}</p>
                </div>
            </div>
            
            <div class="admin-stats-grid">
                <div class="admin-stat-card">
                    <div class="admin-stat-icon">👥</div>
                    <div class="admin-stat-info">
                        <h3>${users.length}</h3>
                        <p>Total Users</p>
                    </div>
                </div>
                <div class="admin-stat-card">
                    <div class="admin-stat-icon">👨‍🎓</div>
                    <div class="admin-stat-info">
                        <h3>${studentCount}</h3>
                        <p>Students</p>
                    </div>
                </div>
                <br>
                <div class="admin-stat-card">
                    <div class="admin-stat-icon">👨‍🏫</div>
                    <div class="admin-stat-info">
                        <h3>${tutorCount}</h3>
                        <p>Tutors</p>
                    </div>
                </div>
                <div class="admin-stat-card">
                    <div class="admin-stat-icon">📚</div>
                    <div class="admin-stat-info">
                        <h3>${courses.length}</h3>
                        <p>Total Courses</p>
                    </div>
                </div>
            </div>
            
            <div class="users-section">
                <div class="section-header">
                    <h3>Manage Users</h3>
                    <span class="user-count">${users.length} Users</span>
                </div>
                
                ${users.length === 0 ?
                    '<div class="no-users"><p>No users registered yet</p></div>' :
                    users.map((user, index) => {
                        const userRole = user.role || 'student';
                        const roleIcon = userRole === 'tutor' ? '👨‍🏫' : '👨‍🎓';
                        const roleText = userRole === 'tutor' ? 'Tutor' : 'Student';
                        const roleColor = userRole === 'tutor' ? '#ff6b6b' : '#7b2cbf';
                        
                        return `
                            <div class="user-card-admin">
                                <div class="user-card-header">
                                    <div class="user-avatar-small">
                                        <span>${roleIcon}</span>
                                    </div>
                                    <div class="user-main-info">
                                        <h4>${user.name}</h4>
                                        <p class="user-email">${user.email}</p>
                                    </div>
                                    <div style="margin-top: -50px; position: absolute; display: fixed;" class="hello">
                                        <span style="background: ${roleColor}; color: white; padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.85rem; font-weight: 600;">
                                            ${roleIcon} ${roleText}
                                        </span>
                                    </div>
                                </div>
                                <div class="user-card-details">
                                    <div class="detail-row">
                                        <span class="detail-icon">📞</span>
                                        <span>${user.phone}</span>
                                    </div>
                                    <div class="detail-row">
                                        <span class="detail-icon">❤️</span>
                                        <span>${user.likedCourses ? user.likedCourses.length : 0} Liked Courses</span>
                                    </div>
                                    ${userRole === 'tutor' ? `
                                        <div class="detail-row">
                                            <span class="detail-icon">📚</span>
                                            <span>${courses.filter(c => c.addedBy === user.email).length} Courses Added</span>
                                        </div>
                                    ` : ''}
                                </div>
                                <div class="user-card-actions">
                                    <button class="btn-admin-edit" onclick="editUser(${index})">
                                        <span>✏️</span> Edit
                                    </button>
                                    <button class="btn-admin-delete" onclick="deleteUser(${index})">
                                        <span>🗑️</span> Delete
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')
                }
            </div>
            
            <button class="btn-logout-admin" onclick="logout()">
                <span>🚪</span> Logout
            </button>
        `;
    } else if (currentUser.role === 'tutor') {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const tutorCourses = courses.filter(c => c.addedBy === currentUser.email);

        // Get students who liked tutor's courses
        const studentsWhoLiked = [];
        tutorCourses.forEach(course => {
            users.forEach(user => {
                if (user.likedCourses && user.likedCourses.includes(course.id)) {
                    const existing = studentsWhoLiked.find(s => s.email === user.email);
                    if (!existing) {
                        studentsWhoLiked.push({
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            likedCount: user.likedCourses.filter(id =>
                                tutorCourses.some(tc => tc.id === id)
                            ).length
                        });
                    }
                }
            });
        });

        profileSection.innerHTML = `
            <div class="admin-header" style="background: linear-gradient(135deg, #ff6b6b, #ffa500);">
                <div class="admin-avatar">
                    <span class="admin-icon">👨‍🏫</span>
                </div>
                <div class="admin-info">
                    <h2>Tutor Dashboard</h2>
                    <p class="admin-email">${currentUser.email}</p>
                </div>
            </div>
            
            <div class="admin-stats-grid">
                <div class="admin-stat-card">
                    <div class="admin-stat-icon">📚</div>
                    <div class="admin-stat-info">
                        <h3>${tutorCourses.length}</h3>
                        <p>My Courses</p>
                    </div>
                </div>
                <div class="admin-stat-card">
                    <div class="admin-stat-icon">👥</div>
                    <div class="admin-stat-info">
                        <h3>${studentsWhoLiked.length}</h3>
                        <p>Students Engaged</p>
                    </div>
                </div>
            </div>
            
            <div class="users-section">
                <div class="section-header">
                    <h3>Students Who Liked My Courses</h3>
                    <span class="user-count">${studentsWhoLiked.length} Students</span>
                </div>
                
                ${studentsWhoLiked.length === 0 ?
                    '<div class="no-users"><p>No students have liked your courses yet</p></div>' :
                    studentsWhoLiked.map((student) => `
                        <div class="user-card-admin">
                            <div class="user-card-header">
                                <div class="user-avatar-small">
                                    <span>👤</span>
                                </div>
                                <div class="user-main-info">
                                    <h4>${student.name}</h4>
                                    <p class="user-email">${student.email}</p>
                                </div>
                            </div>
                            <div class="user-card-details">
                                <div class="detail-row">
                                    <span class="detail-icon">📞</span>
                                    <span>${student.phone}</span>
                                </div>
                                <div class="detail-row">
                                    <span class="detail-icon">❤️</span>
                                    <span>${student.likedCount} of your courses liked</span>
                                </div>
                            </div>
                            <div style="padding: 1rem; background: rgba(255, 107, 107, 0.1); border-radius: 10px; margin-top: 1rem; text-align: center; color: var(--medium-purple);">
                                <small>📝 Note: Only admin can edit or delete student data</small>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
            
            <button class="btn-logout-admin" onclick="logout()">
                <span>🚪</span> Logout
            </button>
        `;
    } else {
        const likedCourses = courses.filter(c => currentUser.likedCourses &&
            currentUser.likedCourses.includes(c.id));

        profileSection.innerHTML = `
            <div class="profile-header">
                <div class="profile-avatar">👤</div>
                <h2>${currentUser.name}</h2>
            </div>
            
            <div class="profile-details">
                <div class="detail-item">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value" id="profileName">${currentUser.name}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Email:</span>
                    <span class="detail-value">${currentUser.email}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Phone:</span>
                    <span class="detail-value" id="profilePhone">${currentUser.phone}</span>
                </div>
            </div>
            
            <button class="btn-edit" onclick="editProfile()">Edit Profile</button>
            
            <div style="margin-top: 2rem;">
                <h3 style="color: var(--dark-purple); margin-bottom: 1rem;">Your Liked Courses</h3>
                ${likedCourses.length === 0 ? '<p>No liked courses yet!</p>' :
                    likedCourses.map(c => `
                        <div class="liked-course-card">
                            <span style="font-size: 2rem;">${c.icon}</span>
                            <h4>${c.name}</h4>
                        </div>
                    `).join('')
                }
            </div>
            
            <button class="btn-edit" style="background: #ff4444;" onclick="logout()">Logout</button>
        `;
    }

    openPanel('profilePanel');
}

// Edit Profile
function editProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const newName = prompt('Enter new name:', currentUser.name);
    const newPhone = prompt('Enter new phone:', currentUser.phone);
    const newPassword = prompt('Enter new password (leave blank to keep current):');

    if (newName || newPhone || newPassword) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === currentUser.email);

        if (userIndex !== -1) {
            let updateMsg = 'Profile Updated: ';

            if (newName && newName !== currentUser.name) {
                users[userIndex].name = newName;
                updateMsg += 'Name ✓ ';
            }

            if (newPhone && newPhone !== currentUser.phone) {
                users[userIndex].phone = newPhone;
                updateMsg += 'Phone Number ✓ ';
            }

            if (newPassword) {
                users[userIndex].password = newPassword;
                updateMsg += 'Password ✓';
            }

            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));

            showSuccessMessage(updateMsg);

            setTimeout(() => {
                closePanel('profilePanel');
                checkLoginStatus();
            }, 2500);
        }
    }
}

// Edit User (Admin)
function editUser(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];

    const newName = prompt('Enter new name:', user.name);
    const newPhone = prompt('Enter new phone:', user.phone);
    const newPassword = prompt('Enter new password (leave blank to keep current):');

    if (newName || newPhone || newPassword) {
        let updateMsg = 'User Updated: ';

        if (newName && newName !== user.name) {
            users[index].name = newName;
            updateMsg += 'Name ✓ ';
        }

        if (newPhone && newPhone !== user.phone) {
            users[index].phone = newPhone;
            updateMsg += 'Phone ✓ ';
        }

        if (newPassword) {
            users[index].password = newPassword;
            updateMsg += 'Password ✓';
        }

        localStorage.setItem('users', JSON.stringify(users));
        showSuccessMessage(updateMsg);

        setTimeout(() => {
            openProfile();
        }, 2500);
    }
}

// Delete User (Admin)
function deleteUser(index) {
    if (confirm('Are you sure you want to delete this user?')) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const deletedUser = users[index];
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        showSuccessMessage('User "' + deletedUser.name + '" deleted successfully! 🗑️');

        setTimeout(() => {
            openProfile();
        }, 2500);
    }
}

// Logout
function logout() {
    localStorage.removeItem('currentUser');
    showLoggedOutState();
    closePanel('profilePanel');
    showSuccessMessage('Logged Out Successfully! 👋');
    renderCourses();
}

// Get liked count for a course
function getLikedCount(courseId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    let count = 0;
    users.forEach(user => {
        if (user.likedCourses && user.likedCourses.includes(courseId)) {
            count++;
        }
    });
    return count;
}

// Show who liked the course
function showCourseLikes(courseId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const course = courses.find(c => c.id === courseId);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Check if tutor is viewing their own course
    if (currentUser.role === 'tutor' && course.addedBy !== currentUser.email) {
        alert('You can only view likes for your own courses!');
        return;
    }

    const likedUsers = users.filter(user =>
        user.likedCourses && user.likedCourses.includes(courseId)
    );

    if (likedUsers.length === 0) {
        alert('No one has liked this course yet!');
        return;
    }

    const usersList = likedUsers.map(user =>
        `👤 ${user.name} (${user.email})`
    ).join('\n');

    alert(`Students who liked "${course.name}":\n\n${usersList}`);
}

// Course ke andar lessons define karo (courses array ke baad):
const courseLessons = {
    1: [
        { id: 1, title: 'Introduction to HTML', duration: '15 min', videoUrl: '' },
        { id: 2, title: 'CSS Fundamentals', duration: '20 min', videoUrl: '' },
        { id: 3, title: 'Responsive Design', duration: '25 min', videoUrl: '' },
        { id: 4, title: 'CSS Grid & Flexbox', duration: '30 min', videoUrl: '' },
        { id: 5, title: 'Final Project', duration: '40 min', videoUrl: '' }
    ],
    2: [
        { id: 1, title: 'Design Principles', duration: '18 min', videoUrl: '' },
        { id: 2, title: 'Color Theory', duration: '22 min', videoUrl: '' },
        { id: 3, title: 'Typography Basics', duration: '20 min', videoUrl: '' },
        { id: 4, title: 'Adobe Photoshop', duration: '35 min', videoUrl: '' },
        { id: 5, title: 'Portfolio Creation', duration: '30 min', videoUrl: '' }
    ]
    // Baaki courses ke liye bhi add kar sakte ho
};

// Show Course Details
function showCourseDetails(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const lessons = courseLessons[courseId] || [
        { id: 1, title: 'Lesson 1: Introduction', duration: '15 min', videoUrl: '' },
        { id: 2, title: 'Lesson 2: Fundamentals', duration: '20 min', videoUrl: '' },
        { id: 3, title: 'Lesson 3: Advanced Topics', duration: '25 min', videoUrl: '' },
        { id: 4, title: 'Lesson 4: Practical Projects', duration: '30 min', videoUrl: '' },
        { id: 5, title: 'Lesson 5: Final Assessment', duration: '20 min', videoUrl: '' }
    ];

    // Check if user has purchased this course
    const hasPurchased = currentUser && currentUser.purchasedCourses && 
                        currentUser.purchasedCourses.includes(courseId);

    const detailsContent = document.getElementById('courseDetailsContent');
    
    detailsContent.innerHTML = `
        <div class="details-container">
            <div class="details-left">
                <div class="details-header">
                    <span class="details-icon">${course.icon}</span>
                    <div class="details-title">
                        <h2>${course.name}</h2>
                        <div class="details-meta">
                            <span class="course-tag">⏱ ${course.duration}</span>
                            <span class="course-tag">📚 ${course.level}</span>
                            <span class="course-tag">🎓 ${lessons.length} Lessons</span>
                        </div>
                    </div>
                </div>

                <div class="details-description">
                    <h3 style="color: var(--dark-purple); margin-bottom: 1rem;">📖 About This Course</h3>
                    <p>${course.description}</p>
                    <p style="margin-top: 1rem;"><strong>What you'll learn:</strong> Master ${course.name} from scratch with hands-on projects and real-world examples. Perfect for ${course.level.toLowerCase()} level students.</p>
                </div>

                <div class="lessons-section">
                    <h3>📚 Course Lessons</h3>
                    <div class="lessons-grid">
                        ${lessons.map((lesson, index) => {
                            const isLocked = !hasPurchased && index > 0; // First lesson free
                            return `
                                <div class="lesson-card ${isLocked ? 'locked' : ''}" 
                                     ${!isLocked ? `onclick="openLesson(${courseId}, ${lesson.id}, '${lesson.title}')"` : ''}>
                                    <div class="lesson-info">
                                        <div class="lesson-number">${index + 1}</div>
                                        <div class="lesson-details">
                                            <h4>${lesson.title}</h4>
                                            <p>Duration: ${lesson.duration}</p>
                                        </div>
                                    </div>
                                    ${isLocked ? '<span class="lock-icon">🔒</span>' : 
                                               '<button class="lesson-play-btn">▶</button>'}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                ${!hasPurchased ? `
                    <div class="unlock-info">
                        <h4>🔓 Unlock All Lessons</h4>
                        <p>Get full access to all ${lessons.length} lessons of this course</p>
                        <p>Course Duration: <strong>${course.duration}</strong></p>
                        <div class="price-highlight">₹1800</div>
                        <p style="font-size: 0.9rem; color: #666;">One-time payment • Lifetime access</p>
                        <button class="payment-btn" onclick="proceedToPayment(${courseId}, '${course.name}', ${course.duration})">
                            💳 Proceed to Payment
                        </button>
                    </div>
                ` : `
                    <div class="unlock-info" style="background: linear-gradient(135deg, rgba(0, 204, 0, 0.2), rgba(0, 255, 0, 0.2)); border-color: #00cc00;">
                        <h4>✅ Course Unlocked!</h4>
                        <p>You have full access to all lessons</p>
                        <p style="color: #00cc00; font-weight: bold;">Enjoy learning! 🎉</p>
                    </div>
                `}
            </div>

            <div class="details-right">
                <div class="course-video-container">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            allowfullscreen>
                    </iframe>
                </div>
                <div style="background: rgba(224, 170, 255, 0.1); padding: 1.5rem; border-radius: 15px;">
                    <h4 style="color: var(--dark-purple); margin: 0 0 1rem 0;">📌 Course Highlights</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>✅</span>
                            <span>${lessons.length} Video Lessons</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>✅</span>
                            <span>Lifetime Access</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>✅</span>
                            <span>Certificate of Completion</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 0.5rem;">
                            <span>✅</span>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    openPanel('detailsPanel');
}

// Open Lesson Page
function openLesson(courseId, lessonId, lessonTitle) {
    const course = courses.find(c => c.id === courseId);
    
    // Create lesson page URL
    const lessonPage = `lesson.html?course=${courseId}&lesson=${lessonId}&title=${encodeURIComponent(lessonTitle)}`;
    
    // Open in new tab
    window.open(lessonPage, '_blank');
}

// Proceed to Payment
function proceedToPayment(courseId, courseName, duration) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        alert('Please login first to purchase the course!');
        closePanel('detailsPanel');
        openPanel('loginPanel');
        return;
    }

    // Store payment info in sessionStorage
    sessionStorage.setItem('paymentInfo', JSON.stringify({
        courseId: courseId,
        courseName: courseName,
        duration: duration,
        amount: 1200,
        userEmail: currentUser.email
    }));

    // Redirect to payment page
    window.location.href = 'payment.html';
}
