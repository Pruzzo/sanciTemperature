import { useEffect, useState } from "react";
import { DateTemperature } from "../../Models/DateTemperature";
import { getAvailableDays, getDayTemperatures, getLastTemperature as getLastTemperatureAsync } from "../../httpService";
import MainTop from "./MainTop";
import MainMiddle from "./MainMiddle";
import Chart from "./Chart";
import { TbTableColumn } from "react-icons/tb";
import IconSelector from "./IconSelector";
import { table } from "console";
import MainBottom from "./MainBottom";


export enum MainPageScope {
  Graph,
  Table
}

function MainPage(props: any) {
  const [lastTemperature, setLastTemperature] = useState<DateTemperature>();
  const [availableDays, setAvailableDays] = useState<Date[]>([]);
  const [dayTemperatures, setDayTemperatures] = useState<DateTemperature[]>([]);
  const [pageScope, setPageScope] = useState<MainPageScope>(MainPageScope.Graph);

  useEffect(() => {
    init();
  }, [])

  const init = async () => {
    await retrieveLastTemperature();
    await retrieveAvailebleDays();
    await retrieveDayTemperatures(new Date);

  }
  const retrieveLastTemperature = async () => {
    var res = await getLastTemperatureAsync();
    setLastTemperature(res);
  }
  const retrieveAvailebleDays = async () => {
    var res = await getAvailableDays();
    setAvailableDays(res);
  }
  const retrieveDayTemperatures = async (date: Date) => {
    var res = await getDayTemperatures(date);
    console.log(res);
    setDayTemperatures(res);
  }

  const changePageScope = () => setPageScope(pageScope == MainPageScope.Table ? MainPageScope.Graph : MainPageScope.Table);


  return (
    <div>
      <MainTop temperature={lastTemperature} />
      <MainMiddle days={availableDays} />
      <IconSelector scope={pageScope} onClick={() => changePageScope()} />
      <MainBottom scope={pageScope} temperatures={dayTemperatures} />
    </div>
  );
}
export default MainPage;