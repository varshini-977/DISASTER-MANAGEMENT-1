import { useEffect, useState } from "react";
import "./App.css";

const initialData = {
  disasters: [
    {
      id: 1,
      title: "Heavy Flood",
      type: "Flood",
      location: "Tirupati",
      severity: "High",
      description: "Heavy rainfall has caused flooding in low-lying areas.",
      status: "In Progress",
      date: "04/10/2026",
    },
    {
      id: 2,
      title: "Cyclone Alert",
      type: "Cyclone",
      location: "Nellore",
      severity: "Medium",
      description: "Strong winds and heavy rainfall expected.",
      status: "Reported",
      date: "04/10/2026",
    },
  ],

  resources: [
    {
      id: 1,
      name: "Drinking Water",
      category: "Water",
      quantity: 500,
      location: "Relief Camp A",
      status: "Available",
    },
    {
      id: 2,
      name: "Food Packets",
      category: "Food",
      quantity: 250,
      location: "Relief Camp B",
      status: "Available",
    },
    {
      id: 3,
      name: "First Aid Kits",
      category: "Medical",
      quantity: 80,
      location: "Government Hospital",
      status: "Limited",
    },
  ],

  volunteers: [
    {
      id: 1,
      name: "Rahul Kumar",
      phone: "9876543210",
      skill: "First Aid",
      location: "Tirupati",
      status: "Available",
    },
    {
      id: 2,
      name: "Priya Reddy",
      phone: "9876501234",
      skill: "Rescue Support",
      location: "Nellore",
      status: "Available",
    },
  ],

  relief: [
    {
      id: 1,
      activity: "Food Distribution",
      location: "Relief Camp A",
      team: "Team Alpha",
      status: "Ongoing",
    },
    {
      id: 2,
      activity: "Medical Camp",
      location: "Village Hospital",
      team: "Team Beta",
      status: "Completed",
    },
  ],
};

/* =========================
   LOGIN PAGE
========================= */

function LoginPage({ onLogin }) {
  const [loginType, setLoginType] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const adminEmail = "deepika@gmail.com";
    const adminPassword = "deepika@123";

    const userEmail = "user@gmail.com";
    const userPassword = "user@123";

    if (
      loginType === "admin" &&
      email === adminEmail &&
      password === adminPassword
    ) {
      localStorage.setItem("dmsRole", "admin");
      onLogin("admin");
      return;
    }

    if (
      loginType === "user" &&
      email === userEmail &&
      password === userPassword
    ) {
      localStorage.setItem("dmsRole", "user");
      onLogin("user");
      return;
    }

    setError("Invalid email or password.");
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">🚨</div>

        <h1>Disaster Management</h1>
        <p className="login-subtitle">
          Emergency Response & Relief Management System
        </p>

        <div className="login-tabs">
          <button
            className={loginType === "user" ? "selected" : ""}
            onClick={() => {
              setLoginType("user");
              setError("");
            }}
          >
            👤 User Login
          </button>

          <button
            className={loginType === "admin" ? "selected" : ""}
            onClick={() => {
              setLoginType("admin");
              setError("");
            }}
          >
            🔐 Admin Login
          </button>
        </div>

        <form onSubmit={handleLogin}>

          <div className="login-input">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-input">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button className="login-button" type="submit">
            {loginType === "admin"
              ? "Login as Administrator"
              : "Login as User"}
          </button>

        </form>

        <p className="login-footer">
          Disaster Management System © 2026
        </p>
      </div>
    </div>
  );
}

/* =========================
   MAIN APPLICATION
========================= */

function App() {
  const [role, setRole] = useState(
    () => localStorage.getItem("dmsRole") || ""
  );

  const [activePage, setActivePage] = useState("dashboard");

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("disasterManagementData");

    return saved ? JSON.parse(saved) : initialData;
  });

  const [disasterForm, setDisasterForm] = useState({
    title: "",
    type: "Flood",
    location: "",
    severity: "Medium",
    description: "",
  });

  const [resourceForm, setResourceForm] = useState({
    name: "",
    category: "Food",
    quantity: "",
    location: "",
    status: "Available",
  });

  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    phone: "",
    skill: "",
    location: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "disasterManagementData",
      JSON.stringify(data)
    );
  }, [data]);

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {
    localStorage.removeItem("dmsRole");
    setRole("");
    setActivePage("dashboard");
  };

  /* =========================
     DISASTER
  ========================= */

  const addDisaster = (e) => {
    e.preventDefault();

    if (
      !disasterForm.title ||
      !disasterForm.location ||
      !disasterForm.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newDisaster = {
      id: Date.now(),
      ...disasterForm,
      status: "Reported",
      date: new Date().toLocaleDateString(),
    };

    setData((prev) => ({
      ...prev,
      disasters: [newDisaster, ...prev.disasters],
    }));

    setDisasterForm({
      title: "",
      type: "Flood",
      location: "",
      severity: "Medium",
      description: "",
    });

    alert("Disaster reported successfully!");
  };

  const deleteDisaster = (id) => {
    setData((prev) => ({
      ...prev,
      disasters: prev.disasters.filter(
        (item) => item.id !== id
      ),
    }));
  };

  const updateDisasterStatus = (id, status) => {
    setData((prev) => ({
      ...prev,
      disasters: prev.disasters.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      ),
    }));
  };

  /* =========================
     RESOURCE
  ========================= */

  const addResource = (e) => {
    e.preventDefault();

    if (
      !resourceForm.name ||
      !resourceForm.quantity ||
      !resourceForm.location
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newResource = {
      id: Date.now(),
      ...resourceForm,
      quantity: Number(resourceForm.quantity),
    };

    setData((prev) => ({
      ...prev,
      resources: [newResource, ...prev.resources],
    }));

    setResourceForm({
      name: "",
      category: "Food",
      quantity: "",
      location: "",
      status: "Available",
    });

    alert("Resource added successfully!");
  };

  const deleteResource = (id) => {
    setData((prev) => ({
      ...prev,
      resources: prev.resources.filter(
        (item) => item.id !== id
      ),
    }));
  };

  /* =========================
     VOLUNTEER
  ========================= */

  const addVolunteer = (e) => {
    e.preventDefault();

    if (
      !volunteerForm.name ||
      !volunteerForm.phone ||
      !volunteerForm.skill ||
      !volunteerForm.location
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newVolunteer = {
      id: Date.now(),
      ...volunteerForm,
      status: "Available",
    };

    setData((prev) => ({
      ...prev,
      volunteers: [newVolunteer, ...prev.volunteers],
    }));

    setVolunteerForm({
      name: "",
      phone: "",
      skill: "",
      location: "",
    });

    alert("Volunteer registered successfully!");
  };

  const deleteVolunteer = (id) => {
    setData((prev) => ({
      ...prev,
      volunteers: prev.volunteers.filter(
        (item) => item.id !== id
      ),
    }));
  };

  /* =========================
     DASHBOARD
  ========================= */

  const renderDashboard = () => {
    const highSeverity = data.disasters.filter(
      (d) => d.severity === "High" || d.severity === "Critical"
    ).length;

    return (
      <>
        <div className="welcome-box">
          <div>
            <h1>
              {role === "admin"
                ? "Administrator Dashboard"
                : "Welcome to Disaster Management"}
            </h1>

            <p>
              Coordinate disaster reports, resources,
              volunteers and relief activities efficiently.
            </p>
          </div>

          <div className="welcome-icon">🚨</div>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <div className="stat-icon red">🚨</div>

            <div>
              <h2>{data.disasters.length}</h2>
              <p>Total Disasters</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">⚠️</div>

            <div>
              <h2>{highSeverity}</h2>
              <p>High Severity</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">📦</div>

            <div>
              <h2>{data.resources.length}</h2>
              <p>Resources</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green">👥</div>

            <div>
              <h2>{data.volunteers.length}</h2>
              <p>Volunteers</p>
            </div>
          </div>

        </div>

        <div className="dashboard-grid">

          <div className="content-card">
            <div className="card-header">
              <h2>Recent Disaster Reports</h2>

              <button
                className="small-btn"
                onClick={() => setActivePage("disasters")}
              >
                View All
              </button>
            </div>

            {data.disasters.slice(0, 4).map((item) => (
              <div className="recent-item" key={item.id}>

                <div>
                  <h3>{item.title}</h3>

                  <p>
                    📍 {item.location} | {item.type}
                  </p>
                </div>

                <span
                  className={`badge ${item.severity.toLowerCase()}`}
                >
                  {item.severity}
                </span>

              </div>
            ))}
          </div>

          <div className="content-card">

            <h2>Emergency Safety Guidelines</h2>

            <div className="guideline">
              <span>🌊</span>
              <div>
                <h3>Flood</h3>
                <p>Move to higher ground and avoid flood water.</p>
              </div>
            </div>

            <div className="guideline">
              <span>🌪️</span>
              <div>
                <h3>Cyclone</h3>
                <p>Stay indoors and keep emergency supplies ready.</p>
              </div>
            </div>

            <div className="guideline">
              <span>🔥</span>
              <div>
                <h3>Fire</h3>
                <p>Leave the building safely.</p>
              </div>
            </div>

            <div className="guideline">
              <span>🏚️</span>
              <div>
                <h3>Earthquake</h3>
                <p>Drop, cover and hold.</p>
              </div>
            </div>

          </div>

        </div>
      </>
    );
  };

  /* =========================
     DISASTER PAGE
  ========================= */

  const renderDisasters = () => (
    <>
      <div className="page-title">
        <div>
          <h1>Disaster Reports</h1>
          <p>Monitor disaster incidents.</p>
        </div>
      </div>

      <div className="form-card">

        <h2>Report New Disaster</h2>

        <form onSubmit={addDisaster}>

          <div className="form-grid">

            <div className="input-group">
              <label>Disaster Title</label>

              <input
                value={disasterForm.title}
                onChange={(e) =>
                  setDisasterForm({
                    ...disasterForm,
                    title: e.target.value,
                  })
                }
                placeholder="Example: Heavy Flood"
              />
            </div>

            <div className="input-group">
              <label>Type</label>

              <select
                value={disasterForm.type}
                onChange={(e) =>
                  setDisasterForm({
                    ...disasterForm,
                    type: e.target.value,
                  })
                }
              >
                <option>Flood</option>
                <option>Cyclone</option>
                <option>Earthquake</option>
                <option>Fire</option>
                <option>Landslide</option>
                <option>Drought</option>
              </select>
            </div>

            <div className="input-group">
              <label>Location</label>

              <input
                value={disasterForm.location}
                onChange={(e) =>
                  setDisasterForm({
                    ...disasterForm,
                    location: e.target.value,
                  })
                }
                placeholder="Affected location"
              />
            </div>

            <div className="input-group">
              <label>Severity</label>

              <select
                value={disasterForm.severity}
                onChange={(e) =>
                  setDisasterForm({
                    ...disasterForm,
                    severity: e.target.value,
                  })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div className="input-group full">
              <label>Description</label>

              <textarea
                value={disasterForm.description}
                onChange={(e) =>
                  setDisasterForm({
                    ...disasterForm,
                    description: e.target.value,
                  })
                }
                placeholder="Describe the disaster..."
              />
            </div>

          </div>

          <button className="primary-btn">
            + Report Disaster
          </button>

        </form>
      </div>

      <div className="content-card">

        <h2>All Disaster Reports</h2>

        <div className="disaster-grid">

          {data.disasters.map((item) => (

            <div className="disaster-card" key={item.id}>

              <div className="disaster-top">

                <div>
                  <h3>{item.title}</h3>
                  <p>📍 {item.location}</p>
                </div>

                <span
                  className={`badge ${item.severity.toLowerCase()}`}
                >
                  {item.severity}
                </span>

              </div>

              <p className="description">
                {item.description}
              </p>

              <div className="disaster-info">
                <span>Type: {item.type}</span>
                <span>Date: {item.date}</span>
              </div>

              <div className="status-display">
                <strong>Status:</strong> {item.status}
              </div>

              {role === "admin" && (
                <div className="action-row">

                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateDisasterStatus(
                        item.id,
                        e.target.value
                      )
                    }
                  >
                    <option>Reported</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteDisaster(item.id)
                    }
                  >
                    Delete
                  </button>

                </div>
              )}

            </div>

          ))}

        </div>

      </div>
    </>
  );

  /* =========================
     RESOURCES
  ========================= */

  const renderResources = () => (
    <>
      <div className="page-title">
        <div>
          <h1>Resources</h1>
          <p>View emergency relief resources.</p>
        </div>
      </div>

      {role === "admin" && (
        <div className="form-card">

          <h2>Add Resource</h2>

          <form onSubmit={addResource}>

            <div className="form-grid">

              <div className="input-group">
                <label>Resource Name</label>

                <input
                  value={resourceForm.name}
                  onChange={(e) =>
                    setResourceForm({
                      ...resourceForm,
                      name: e.target.value,
                    })
                  }
                  placeholder="Food Packets"
                />
              </div>

              <div className="input-group">
                <label>Category</label>

                <select
                  value={resourceForm.category}
                  onChange={(e) =>
                    setResourceForm({
                      ...resourceForm,
                      category: e.target.value,
                    })
                  }
                >
                  <option>Food</option>
                  <option>Water</option>
                  <option>Medical</option>
                  <option>Clothing</option>
                  <option>Equipment</option>
                </select>
              </div>

              <div className="input-group">
                <label>Quantity</label>

                <input
                  type="number"
                  value={resourceForm.quantity}
                  onChange={(e) =>
                    setResourceForm({
                      ...resourceForm,
                      quantity: e.target.value,
                    })
                  }
                />
              </div>

              <div className="input-group">
                <label>Location</label>

                <input
                  value={resourceForm.location}
                  onChange={(e) =>
                    setResourceForm({
                      ...resourceForm,
                      location: e.target.value,
                    })
                  }
                  placeholder="Relief Camp A"
                />
              </div>

              <div className="input-group">
                <label>Status</label>

                <select
                  value={resourceForm.status}
                  onChange={(e) =>
                    setResourceForm({
                      ...resourceForm,
                      status: e.target.value,
                    })
                  }
                >
                  <option>Available</option>
                  <option>Limited</option>
                  <option>Out of Stock</option>
                </select>
              </div>

            </div>

            <button className="primary-btn">
              + Add Resource
            </button>

          </form>

        </div>
      )}

      <div className="content-card">

        <h2>Available Resources</h2>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Resource</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Location</th>
                <th>Status</th>

                {role === "admin" && <th>Action</th>}
              </tr>
            </thead>

            <tbody>

              {data.resources.map((item) => (

                <tr key={item.id}>

                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.location}</td>
                  <td>{item.status}</td>

                  {role === "admin" && (
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteResource(item.id)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  )}

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
    </>
  );

  /* =========================
     VOLUNTEERS
  ========================= */

  const renderVolunteers = () => (
    <>
      <div className="page-title">
        <div>
          <h1>Volunteers</h1>
          <p>Register and manage emergency volunteers.</p>
        </div>
      </div>

      <div className="form-card">

        <h2>Register as Volunteer</h2>

        <form onSubmit={addVolunteer}>

          <div className="form-grid">

            <div className="input-group">
              <label>Name</label>

              <input
                value={volunteerForm.name}
                onChange={(e) =>
                  setVolunteerForm({
                    ...volunteerForm,
                    name: e.target.value,
                  })
                }
                placeholder="Your name"
              />
            </div>

            <div className="input-group">
              <label>Phone</label>

              <input
                value={volunteerForm.phone}
                onChange={(e) =>
                  setVolunteerForm({
                    ...volunteerForm,
                    phone: e.target.value,
                  })
                }
                placeholder="Phone number"
              />
            </div>

            <div className="input-group">
              <label>Skill</label>

              <input
                value={volunteerForm.skill}
                onChange={(e) =>
                  setVolunteerForm({
                    ...volunteerForm,
                    skill: e.target.value,
                  })
                }
                placeholder="First Aid / Rescue"
              />
            </div>

            <div className="input-group">
              <label>Location</label>

              <input
                value={volunteerForm.location}
                onChange={(e) =>
                  setVolunteerForm({
                    ...volunteerForm,
                    location: e.target.value,
                  })
                }
                placeholder="Your location"
              />
            </div>

          </div>

          <button className="primary-btn">
            + Register Volunteer
          </button>

        </form>

      </div>

      <div className="content-card">

        <h2>Registered Volunteers</h2>

        <div className="volunteer-grid">

          {data.volunteers.map((item) => (

            <div className="volunteer-card" key={item.id}>

              <div className="volunteer-avatar">
                👤
              </div>

              <div className="volunteer-details">
                <h3>{item.name}</h3>
                <p>📞 {item.phone}</p>
                <p>🛠️ {item.skill}</p>
                <p>📍 {item.location}</p>
              </div>

              <span className="volunteer-status">
                {item.status}
              </span>

              {role === "admin" && (
                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteVolunteer(item.id)
                  }
                >
                  Delete
                </button>
              )}

            </div>

          ))}

        </div>

      </div>
    </>
  );

  /* =========================
     RELIEF
  ========================= */

  const renderRelief = () => (
    <>
      <div className="page-title">
        <div>
          <h1>Relief Activities</h1>
          <p>Monitor relief operations.</p>
        </div>
      </div>

      <div className="relief-grid">

        {data.relief.map((item) => (

          <div className="relief-card" key={item.id}>

            <div className="relief-icon">
              🤝
            </div>

            <h2>{item.activity}</h2>

            <p>
              <strong>Location:</strong>{" "}
              {item.location}
            </p>

            <p>
              <strong>Team:</strong>{" "}
              {item.team}
            </p>

            <span className="relief-status">
              {item.status}
            </span>

          </div>

        ))}

      </div>
    </>
  );

  /* =========================
     ANALYTICS
  ========================= */

  const renderAnalytics = () => {

    if (role !== "admin") {
      return (
        <div className="content-card access-denied">
          <h1>Admin Access Only</h1>
          <p>
            Analytics are available only for administrators.
          </p>
        </div>
      );
    }

    const types = [
      "Flood",
      "Cyclone",
      "Earthquake",
      "Fire",
      "Landslide",
    ];

    return (
      <>
        <div className="page-title">
          <div>
            <h1>Analytics</h1>
            <p>Disaster management statistics.</p>
          </div>
        </div>

        <div className="analytics-grid">

          <div className="analytics-card">
            <h2>{data.disasters.length}</h2>
            <p>Total Reports</p>
          </div>

          <div className="analytics-card">
            <h2>
              {
                data.disasters.filter(
                  (d) =>
                    d.severity === "High" ||
                    d.severity === "Critical"
                ).length
              }
            </h2>
            <p>High Severity</p>
          </div>

          <div className="analytics-card">
            <h2>{data.resources.length}</h2>
            <p>Resources</p>
          </div>

          <div className="analytics-card">
            <h2>{data.volunteers.length}</h2>
            <p>Volunteers</p>
          </div>

        </div>

        <div className="content-card">

          <h2>Disaster Type Analysis</h2>

          {types.map((type) => {

            const count = data.disasters.filter(
              (d) => d.type === type
            ).length;

            const percentage =
              data.disasters.length === 0
                ? 0
                : (count / data.disasters.length) * 100;

            return (
              <div className="chart-row" key={type}>

                <span>{type}</span>

                <div className="bar-bg">
                  <div
                    className="bar"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <strong>{count}</strong>

              </div>
            );
          })}

        </div>
      </>
    );
  };

  /* =========================
     PAGE ROUTING
  ========================= */

  const renderPage = () => {

    switch (activePage) {

      case "dashboard":
        return renderDashboard();

      case "disasters":
        return renderDisasters();

      case "resources":
        return renderResources();

      case "volunteers":
        return renderVolunteers();

      case "relief":
        return renderRelief();

      case "analytics":
        return renderAnalytics();

      default:
        return renderDashboard();
    }
  };

  /* =========================
     MENU
  ========================= */

  const adminMenu = [
    {
      id: "dashboard",
      icon: "📊",
      label: "Dashboard",
    },
    {
      id: "disasters",
      icon: "🚨",
      label: "Disaster Reports",
    },
    {
      id: "resources",
      icon: "📦",
      label: "Resources",
    },
    {
      id: "volunteers",
      icon: "👥",
      label: "Volunteers",
    },
    {
      id: "relief",
      icon: "🤝",
      label: "Relief Activities",
    },
    {
      id: "analytics",
      icon: "📈",
      label: "Analytics",
    },
  ];

  const userMenu = [
    {
      id: "dashboard",
      icon: "🏠",
      label: "My Dashboard",
    },
    {
      id: "disasters",
      icon: "🚨",
      label: "Report Disaster",
    },
    {
      id: "resources",
      icon: "📦",
      label: "Resources",
    },
    {
      id: "volunteers",
      icon: "👥",
      label: "Volunteer",
    },
    {
      id: "relief",
      icon: "🤝",
      label: "Relief Activities",
    },
  ];

  const menu =
    role === "admin" ? adminMenu : userMenu;

  const currentTitle =
    menu.find((item) => item.id === activePage)?.label ||
    "Dashboard";

  /* =========================
     MAIN UI
  ========================= */

  if (!role) {
    return <LoginPage onLogin={setRole} />;
  }

  return (
    <div className="app">

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            🚨
          </div>

          <div>
            <h2>Disaster</h2>
            <span>Management System</span>
          </div>

        </div>

        <nav>

          {menu.map((item) => (

            <button
              key={item.id}
              className={`nav-item ${
                activePage === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActivePage(item.id)
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </button>

          ))}

        </nav>

        <div className="sidebar-bottom">

          <div className="emergency-box">
            <span>☎️</span>

            <div>
              <strong>Emergency</strong>
              <p>Call 112</p>
            </div>
          </div>

        </div>

      </aside>

      <main className="main">

        <header className="topbar">

          <div>
            <h2>{currentTitle}</h2>

            <p>
              {role === "admin"
                ? "Administrator Portal"
                : "User Emergency Portal"}
            </p>
          </div>

          <div className="admin">

            <div className="admin-avatar">
              {role === "admin" ? "A" : "U"}
            </div>

            <div>
              <strong>
                {role === "admin"
                  ? "Administrator"
                  : "Registered User"}
              </strong>

              <small>
                {role === "admin"
                  ? "System Admin"
                  : "Emergency User"}
              </small>
            </div>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </div>

        </header>

        <section className="page-content">
          {renderPage()}
        </section>

        <footer>
          <p>
            © 2026 Disaster Management System |
            BTech Full Stack Web Project
          </p>
        </footer>

      </main>

    </div>
  );
}

export default App;