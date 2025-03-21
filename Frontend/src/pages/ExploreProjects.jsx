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
  const allCountries = useSelector((state) => state.general.countries);
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");
  const [searchCountry, setSearchCountry] = useState("");

  // Update the URL with filters only when they change
  const updateURL = useCallback(
    (filters) => {
      const newParams = new URLSearchParams();

      // Only add key-value pairs where the value is not null, undefined, or 0
      for (let [key, value] of Object.entries(filters)) {
        if (
          !(
            value === "" ||
            value === 0 ||
            (key === "budget" &&
              (value === "0-0" ||
                Number(value.split("-")[0]) > Number(value.split("-")[1])))
          )
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
      dispatch(filterProjects());
    };

    // Only update the URL and fetch projects when projectFilter actually changes
    // if (projectFilter.status.length > 0) {
    updateURL(projectFilter); // Update URL with filter values
    getProjects();
    // }
  }, [projectFilter, updateURL]); // Only update URL and fetch projects when projectFilter changes

  // Extract filters from URL only on initial render or URL change
  useEffect(() => {
    const filtersFromURL = {};
    queryParams.forEach((value, key) => {
      filtersFromURL[key] = value;
    });
    dispatch(updateFilters(filtersFromURL));
  }, [search, dispatch]);

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

  useEffect(() => {
    console.log("filter skills: ", projectFilter.skills);
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
  }, [projectFilter.skills]);

  const handleSkillsChange = (event, skill) => {
    const prevSkills =
      projectFilter.skills.split(",").filter((s) => s !== "") || [];
    const updatedSkills = event.target.checked
      ? [...new Set([...prevSkills, String(skill.id)])]
      : prevSkills.filter((v) => v !== String(skill.id));
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

  const handleSkillsSelection = (skill) => {
    console.log("selected skill->", skill.name);
    const prevSkills = projectFilter.skills.split(",") || [];
    let updatedSkills = [];
    if (!prevSkills.includes(skill.id)) {
      updatedSkills = [...new Set([...prevSkills, skill.id])];
    } else {
      updatedSkills = prevSkills.filter((skl) => skl !== skill.id);
    }
    console.log("updatedskills->", updatedSkills);

    dispatch(
      updateFilters({
        ...projectFilter,
        skills: updatedSkills.length > 0 ? updatedSkills.join(",") : "",
      })
    );
    console.log("whole filter->", projectFilter);
    console.log("skills-> ", projectFilter.skills);
    setSearchSkill("");
  };

  useEffect(() => {
    console.log("filter countries: ", projectFilter.clientCountries);
    function mergeCountries(arr1, arr2, key) {
      const map = new Map();

      [...arr1, ...arr2].forEach((obj) => {
        map.set(obj[key], obj);
      });

      return Array.from(map.values());
    }
    setCountries(
      mergeCountries(
        projectFilter.clientCountries
          .split(",")
          .map((id) => allCountries?.find((obj) => obj.id === Number(id))) // Convert id to number
          .filter(Boolean), // Remove undefined values
        countries,
        "id"
      )
    );
  }, [projectFilter.clientCountries]);

  const handleCountryChange = (event, country) => {
    const prevCountries =
      projectFilter.clientCountries.split(",").filter((s) => s !== "") || [];
    const updatedCountries = event.target.checked
      ? [...new Set([...prevCountries, String(country.id)])]
      : prevSkills.filter((v) => v !== String(country.id));
    console.log("updated countries->", updatedCountries);

    dispatch(
      updateFilters({
        ...projectFilter,
        clientCountries:
          updatedCountries.length > 0 ? updatedCountries.join(",") : "",
      })
    );
    console.log("whole filter->", projectFilter);
    console.log("countries-> ", projectFilter.clientCountries);
  };

  const handleCountrySelection = (country) => {
    console.log("selected country->", country.name);
    const prevCountries = projectFilter.clientCountries.split(",") || [];
    let updatedCountries = [];
    if (!prevCountries.includes(country.id)) {
      updatedCountries = [...new Set([...prevCountries, country.id])];
    } else {
      updatedCountries = prevCountries.filter((cntry) => cntry !== country.id);
    }
    console.log("updated countries->", updatedCountries);

    dispatch(
      updateFilters({
        ...projectFilter,
        clientCountries:
          updatedCountries.length > 0 ? updatedCountries.join(",") : "",
      })
    );
    console.log("whole filter->", projectFilter);
    console.log("countries-> ", projectFilter.clientCountries);
    setSearchCountry("");
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-3 px-5 py-3 overflow-hidden">
      {/* <div className="w-full mx-auto px-4"> */}
      {/* <div className="grid grid-cols-12 gap-3"> */}
      <div className="h-full overflow-auto hidden md:flex flex-col md:col-span-4 lg:col-span-3 border rounded shadow-md p-3 gap-3">
        <header className="font-bold text-xl">Filters</header>
        <div className="flex flex-col gap-1">
          <FilterHeading
            title="Status"
            prop="status"
            def=""
            dispatch={dispatch}
            projectFilters={projectFilter}
          />
          <div className="flex flex-col gap-1">
            {["Open", "In_progress", "Completed"].map((status) => {
              return (
                <label className="flex items-center" key={status}>
                  <input
                    type="checkbox"
                    value={status}
                    className="mr-2 form-checkbox bg-blue-600"
                    checked={projectFilter.status.split(",").includes(status)}
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
          <div className="flex flex-col gap-1">
            <div className="flex flex-col">
              <label htmlFor="budgetMin" className="font-semibold">
                min:{" "}
              </label>
              <div className="flex border rounded shadow-sm p-1">
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
              <label htmlFor="budgetMax" className="font-semibold">
                max:{" "}
              </label>
              <div className="flex border rounded shadow-sm p-1">
                <span className="px-1">₹</span>
                <input
                  type="number"
                  id="budgetMax"
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
          </div>
          {isNaN(projectFilter.budget.split("-")[0]) ||
            isNaN(projectFilter.budget.split("-")[1]) ||
            (Number(projectFilter.budget.split("-")[0]) >
              Number(projectFilter.budget.split("-")[1]) && (
              <p className="text-red-600">Please enter correct range</p>
            ))}
        </div>
        <div className="flex flex-col gap-1">
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
              onValueChange={(value) => {
                console.log("search input", value);
                setSearchSkill(value);
              }}
              value={searchSkill}
            />
            <CommandList
              className={`max-h-20 overflow-y-auto shadow-sm 
                ${searchSkill ? "block" : "hidden"}`}
            >
              {allSkills?.map((skill) => (
                <CommandItem
                  key={skill.id}
                  onSelect={() => handleSkillsSelection(skill)}
                  className="cursor-pointer"
                >
                  {skill.name}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
          <div className="flex flex-col px-3 gap-1">
            {skills.map((skill) => {
              return (
                <label
                  className="flex items-center"
                  key={skill.id}
                  htmlFor={skill.id}
                >
                  <input
                    type="checkbox"
                    value={skill}
                    id={skill.id}
                    className="mr-2 form-checkbox bg-blue-600"
                    checked={projectFilter.skills
                      .split(",")
                      .includes(String(skill.id))}
                    onChange={(event) => handleSkillsChange(event, skill)}
                  />
                  {skill.name}
                </label>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <FilterHeading
            title="Project Location"
            prop="projectLocation"
            def=""
            dispatch={dispatch}
            projectFilters={projectFilter}
          />
          <div className="border shadow rounded-lg flex justify-between items-center p-1 px-2">
            <input
              type="text"
              placeholder="Location"
              className="focus:outline-none focus:ring-0 w-full"
            />
            <button className="p-1">
              <MapPin size={20} color="black" />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <FilterHeading
            title="Client's Country"
            prop="clientCountries"
            def=""
            dispatch={dispatch}
            projectFilters={projectFilter}
          />
          <Command className="border rounded-lg shadow-sm">
            <CommandInput
              placeholder="Type a country..."
              onValueChange={(value) => {
                console.log("search input", value);
                setSearchCountry(value);
              }}
              value={searchCountry}
            />
            <CommandList
              className={`max-h-20 overflow-y-auto shadow-sm 
                ${searchCountry ? "block" : "hidden"}`}
            >
              {allCountries?.map((country) => (
                <CommandItem
                  key={country.id}
                  onSelect={() => handleCountrySelection(country)}
                  className="cursor-pointer"
                >
                  {country.name}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
          <div className="flex flex-col px-3 gap-1">
            {countries.map((country) => {
              return (
                <label
                  className="flex items-center"
                  key={country.id}
                  htmlFor={country.id}
                >
                  <input
                    type="checkbox"
                    value={country}
                    id={country.id}
                    className="mr-2 form-checkbox bg-blue-600"
                    checked={projectFilter.clientCountries
                      .split(",")
                      .includes(String(country.id))}
                    onChange={(event) => handleCountryChange(event, country)}
                  />
                  {country.name}
                </label>
              );
            })}
          </div>
        </div>
      </div>
      <div className="overflow-auto col-span-12 md:col-span-8 lg:col-span-9 border rounded shadow-md p-3">
        Projects
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
