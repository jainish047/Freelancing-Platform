import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { updateFilters } from "../context/projectFiltersSlice";
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { filterProjects } from "../context/projectFiltersSlice";
import FilterHeading from "../components/FilterHeading";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from "../components/ui/command";
import { MapPin } from "lucide-react";

export default function ExploreProjects() {
  const dispatch = useDispatch();
  const projectFilter = useSelector((state) => state.projectFilter);
  const allSkills = useSelector((state) => state.general.skills);
  const allContries = useSelector((state) => state.general.countries);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");

  // Extract filters from URL only on initial render or URL change
  useEffect(() => {
    const filtersFromURL = {};
    queryParams.forEach((value, key) => {
      filtersFromURL[key] = value;
    });
    dispatch(updateFilters(filtersFromURL));
  }, [search, dispatch]);

  // Update the URL with filters only when they change
  const updateURL = useCallback(
    (filters) => {
      const newParams = new URLSearchParams();

      // Only add key-value pairs where the value is not null, undefined, or 0
      for (let [key, value] of Object.entries(filters)) {
        if (
          value !== "" &&
          value !== 0 &&
          value !== "0-0" &&
          value.length == 0
        ) {
          newParams.set(key, value);
        }
      }

      // Avoid pushing the same URL again
      if (search !== `?${newParams.toString()}`) {
        navigate({ search: newParams.toString() });
      }
    },
    [search, navigate]
  );

  // Fetch projects when filter changes
  useEffect(() => {
    const getProjects = async () => {
      filterProjects();
    };

    // Only update the URL and fetch projects when projectFilter actually changes
    // if (projectFilter.status.length > 0) {
    updateURL(projectFilter); // Update URL with filter values
    getProjects();
    // }
  }, [projectFilter, updateURL]); // Only update URL and fetch projects when projectFilter changes

  // Handle checkbox change and update filters in Redux store
  const handleStatusChange = (event) => {
    const prevStatus = projectFilter.status.split(",") || [];
    const updatedStatus = event.target.checked
      ? [...prevStatus, event.target.value]
      : prevStatus.filter((v) => v !== event.target.value);
    console.log("updatedstatus->", updatedStatus);

    dispatch(
      updateFilters({
        ...projectFilter,
        status: updatedStatus.length > 0 ? updatedStatus.join(",") : "",
      })
    );
    console.log("whole filter->", projectFilter);
    console.log("status-> ", projectFilter.status);
  };

  const handleSkillsChange = (event) => {
    const prevSkills = projectFilter.skills.split(",") || [];
    const updatedSkills = event.target.checked
      ? [...prevSkills, event.target.value]
      : prevSkills.filter((v) => v !== event.target.value);
    console.log("updatedskills->", updatedSkills);

    dispatch(
      updateFilters({
        ...projectFilter,
        skills: updatedSkills.length > 0 ? updatedSkills.join(",") : "",
      })
    );
    console.log("whole filter->", projectFilter);
    console.log("skills-> ", projectFilter.skills);
  };

  useEffect(() => {
    function mergeSkills(arr1, arr2, key) {
      const map = new Map();

      [...arr1, ...arr2].forEach((obj) => {
        map.set(obj[key], obj);
      });

      return Array.from(map.values());
    }
    setSkills(
      mergeSkills(
        projectFilter.skills
          .split(",")
          .map((id) => allSkills?.find((obj) => obj.id === Number(id))) // Convert id to number
          .filter(Boolean), // Remove undefined values
        skills,
        "id"
      )
    );
  }, [projectFilter.skills, skills]);

  return (
    <div className="flex justify-center p-3">
      <div className="w-full mx-auto px-4">
        <div className="grid grid-cols-12 gap-3">
          <div className="hidden md:block col-span-3 border rounded shadow-sm p-3">
            <header className="font-bold text-xl">Filters</header>
            <div className="py-2">
              <FilterHeading
                title="Status"
                prop="status"
                def=""
                dispatch={dispatch}
                projectFilters={projectFilter}
              />
              <div>
                {["Open", "In_progress", "Completed"].map((status) => {
                  return (
                    <label className="flex items-center" key={status}>
                      <input
                        type="checkbox"
                        value={status}
                        className="mr-2 form-checkbox bg-blue-600"
                        checked={projectFilter.status
                          .split(",")
                          .includes(status)}
                        onChange={(event) => handleStatusChange(event)}
                      />
                      {status}
                    </label>
                  );
                })}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <FilterHeading
                title="Budget"
                prop="budget"
                def={""}
                dispatch={dispatch}
                projectFilters={projectFilter}
              />
              <div className="flex flex-col">
                <label for="budgetMin" className="font-semibold">
                  min:{" "}
                </label>
                <div className="flex border rounded p-1">
                  <span className="px-1">₹</span>
                  <input
                    type="number"
                    id="budgetMin"
                    min="1"
                    max="100"
                    step="1"
                    placeholder="0"
                    className="w-full focus:outline-none focus:ring-0"
                    onChange={(event) => {
                      const prevBudget = projectFilter.budget.split("-") || [
                        0, 0,
                      ];
                      prevBudget[0] = parseInt(event.target.value) || 0;
                      dispatch(
                        updateFilters({
                          ...projectFilter,
                          budget: prevBudget.join("-"),
                        })
                      );
                    }}
                    value={parseInt(projectFilter.budget.split("-")[0]) || 0}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label for="budgetMin" className="font-semibold">
                  max:{" "}
                </label>
                <div className="flex border rounded p-1">
                  <span className="px-1">₹</span>
                  <input
                    type="number"
                    id="budgetMin"
                    min="1"
                    max="100"
                    step="1"
                    placeholder="0"
                    value={parseInt(projectFilter.budget.split("-")[1]) || 0}
                    className="w-full focus:outline-none focus:ring-0"
                    onChange={(event) => {
                      const prevBudget = projectFilter.budget.split("-") || [
                        0, 0,
                      ];
                      prevBudget[1] = parseInt(event.target.value) || 0;
                      dispatch(
                        updateFilters({
                          ...projectFilter,
                          budget: prevBudget.join("-"),
                        })
                      );
                    }}
                  />
                </div>
              </div>
              {isNaN(projectFilter.budget.split("-")[0]) ||
                isNaN(projectFilter.budget.split("-")[1]) ||
                (Number(projectFilter.budget.split("-")[0]) >
                  Number(projectFilter.budget.split("-")[1]) && (
                  <p className="text-red-600">Please enter correct range</p>
                ))}
            </div>
            <div className="flex flex-col">
              <FilterHeading
                title="Skills"
                prop="skills"
                def=""
                dispatch={dispatch}
                projectFilters={projectFilter}
              />
              <Command className="border rounded-lg shadow-sm">
                <CommandInput
                  placeholder="Type a skill..."
                  onChange={(e) => setSearchSkill(e.target.value)}
                  // value={searchSkill}
                />
                <CommandList
                  className={searchSkill !== "" ? "hidden" : "block"}
                >
                  {allSkills?.map((skill) => (
                    <CommandItem key={skill.id}>{skill.name}</CommandItem>
                  ))}
                </CommandList>
              </Command>
              {skills.map((skill) => {
                return (
                  <label className="flex items-center" key={skill.id}>
                    <input
                      type="checkbox"
                      value={skill}
                      className="mr-2 form-checkbox bg-blue-600"
                      checked={projectFilter.skills
                        .split(",")
                        .includes(skill.id)}
                      onChange={(event) => handleSkillsChange(event)}
                    />
                    {skill.name}
                  </label>
                );
              })}
            </div>
            <div className="py-2">
              <FilterHeading
                title="Project Location"
                prop="projectLocation"
                def=""
                dispatch={dispatch}
                projectFilters={projectFilter}
              />
              <div className="border rounded flex justify-between items-center p-1 px-2 ">
                <input
                  type="text"
                  className="focus:outline-none focus:ring-0 w-full"
                />
                <button className="p-1">
                  <MapPin size={20} color="black" />
                </button>
              </div>
            </div>
            <div>
              <FilterHeading
                title="Client's Country"
                prop="clientLocation"
                def=""
                dispatch={dispatch}
                projectFilters={projectFilter}
              />
              <Command className="border rounded-lg shadow-sm">
                <CommandInput
                  placeholder="Type a country..."
                  onChange={(e) => setSearchSkill(e.target.value)}
                  // value={searchSkill}
                />
                <CommandList
                  className={searchSkill !== "" ? "block" : "hidden"}
                >
                  {allContries?.map((country) => (
                    <CommandItem key={country.id}>{country.name}</CommandItem>
                  ))}
                </CommandList>
              </Command>
            </div>
          </div>
          <div className="col-span-9 border rounded shadow-sm p-3">results</div>
        </div>
      </div>
    </div>
  );
}
