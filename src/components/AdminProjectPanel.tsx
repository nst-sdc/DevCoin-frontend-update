import React, { useState, useEffect } from 'react';
import { Database } from '../types/supabase';
import {
  addProject,
  updateProject,
  getAllProjects,
  deactivateAllProjects,
  isAdmin,
} from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type Project = Database['public']['Tables']['projects']['Row'];
type ProjectInput = Database['public']['Tables']['projects']['Insert'];

export const AdminProjectPanel: React.FC = () => {
  const { user } = useAuth();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<ProjectInput>({
    name: '',
    description: '',
    repository_url: '',
    tech_stack: [],
    difficulty_level: 'intermediate',
    maintainer_id: '',
  });
  const [techStackInput, setTechStackInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user?.id) {
        const admin = await isAdmin(user.id);
        setIsAdminUser(admin);
        if (admin) {
          loadProjects();
        }
      }
    };
    checkAdmin();
  }, [user]);

  const loadProjects = async () => {
    const projectsData = await getAllProjects();
    setProjects(projectsData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setLoading(true);
    try {
      // Deactivate all existing projects if this is marked as active
      if (newProject.is_active) {
        await deactivateAllProjects();
      }

      // Add the new project
      await addProject({
        ...newProject,
        maintainer_id: user.id,
      });

      // Reset form and reload projects
      setNewProject({
        name: '',
        description: '',
        repository_url: '',
        tech_stack: [],
        difficulty_level: 'intermediate',
        maintainer_id: '',
      });
      setTechStackInput('');
      await loadProjects();
    } catch (error) {
      console.error('Error adding project:', error);
      alert('Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  const handleTechStackAdd = () => {
    if (techStackInput.trim()) {
      setNewProject(prev => ({
        ...prev,
        tech_stack: [...(prev.tech_stack || []), techStackInput.trim()],
      }));
      setTechStackInput('');
    }
  };

  const handleTechStackRemove = (index: number) => {
    setNewProject(prev => ({
      ...prev,
      tech_stack: prev.tech_stack?.filter((_, i) => i !== index) || [],
    }));
  };

  if (!isAdminUser) {
    return <div className="p-4">You don't have access to this panel.</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Project Management</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Project Name</label>
          <input
            type="text"
            value={newProject.name}
            onChange={e => setNewProject(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={newProject.description}
            onChange={e => setNewProject(prev => ({ ...prev, description: e.target.value }))}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Repository URL</label>
          <input
            type="url"
            value={newProject.repository_url}
            onChange={e => setNewProject(prev => ({ ...prev, repository_url: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tech Stack</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={techStackInput}
              onChange={e => setTechStackInput(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Add technology..."
            />
            <button
              type="button"
              onClick={handleTechStackAdd}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {newProject.tech_stack?.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-200 rounded-full flex items-center gap-1"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleTechStackRemove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Difficulty Level</label>
          <select
            value={newProject.difficulty_level}
            onChange={e => setNewProject(prev => ({
              ...prev,
              difficulty_level: e.target.value as 'beginner' | 'intermediate' | 'advanced'
            }))}
            className="w-full p-2 border rounded"
            required
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={newProject.is_active}
              onChange={e => setNewProject(prev => ({ ...prev, is_active: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm font-medium">Set as Active Project</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? 'Adding Project...' : 'Add Project'}
        </button>
      </form>

      <div>
        <h3 className="text-xl font-bold mb-4">Existing Projects</h3>
        <div className="space-y-4">
          {projects.map(project => (
            <div
              key={project.id}
              className={`p-4 border rounded ${
                project.is_active ? 'border-green-500 bg-green-50' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">{project.name}</h4>
                  <p className="text-sm text-gray-600">{project.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tech_stack?.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {project.is_active ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span>Inactive</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
