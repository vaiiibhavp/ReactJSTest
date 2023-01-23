import { useEffect, useState } from "react";
import carList from "../../data/dataJSON.json";
import { dataObject } from "../../types";

interface detail {
  value: string;
  count: number;
  percentage: number;
}
interface props {
  label?: string;
  type: string;
  detail?: string;
}

type Org = { [key: string]: Array<dataObject> };

const List = (props: props) => {
  const { label, detail, type } = props;
  const [makerArray, setMakerArray] = useState<Org>({});
  let totalData = carList.length;

  const [first, setFirst] = useState<detail>({
    value: "",
    count: 0,
    percentage: 0,
  });
  const [second, setSecond] = useState<detail>({
    value: "",
    count: 0,
    percentage: 0,
  });

  useEffect(() => {
    const obj: any = {};
    carList.map((item: any) => {
      if (Object.keys(obj).length && Object.keys(obj).includes(item[type])) {
        obj[item[type]].push(item);
      } else {
        obj[item[type]] = [item];
      }
    });
    setMakerArray(obj);
  }, [carList]);

  useEffect(() => {
    const sortedArray: any = Object.entries(makerArray).sort(
      (a: any, b: any) => {
        return a[1].length - b[1].length;
      }
    );

    if (sortedArray.length) {
      //@ts-ignore
      setFirst({
        value: sortedArray.at(-1)[0],
        count: sortedArray.at(-1)[1].length,
        percentage: (sortedArray.at(-1)[1].length / totalData) * 100,
      });
      setSecond({
        value: sortedArray.at(-2)[0],
        count: sortedArray.at(-2)[1].length,
        percentage: (sortedArray.at(-2)[1].length / totalData) * 100,
      });
    }
  }, [makerArray]);

  return (
    <>
      <div className="wrapper">
        <div>
          <u className="nameSpace">A</u>
          <strong>{label}</strong>
        </div>
        <div className="mb-10">
          <small>{detail}</small>
        </div>
        <div className="d-flex">
          <div className="carModel w-40 d-flex">
            {type === "Model" ? (
              <>
                <div>
                  <h2 className="modelCount">
                    {Object.keys(makerArray).length}
                  </h2>
                  <h4>Unique values</h4>
                </div>
              </>
            ) : (
              <>
                <div className="w-50 d-flex justify-between">
                  <div className="w-100">{first?.value}</div>
                  <div className="w-100">{second?.value}</div>
                  <div className="others w-100">
                    Others ({totalData - first?.count - second?.count})
                  </div>
                </div>
                <div className="w-50 d-flex justify-between">
                  <div className="w-100">
                    {first?.percentage.toFixed(2) + "%"}
                  </div>
                  <div className="w-100">
                    {second?.percentage.toFixed(2) + "%"}
                  </div>
                  <div className="others w-100">
                    {(100 - first?.percentage - second?.percentage).toFixed(2) +
                      "%"}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="carDetails w-60 d-flex">
            <div className="progessBar valid w-100"></div>
            <div className="w-60">
              <div>
                Valid <span className="colorDot valid"></span>
              </div>
              <div>
                Mismatched <span className="colorDot mis-matched"></span>
              </div>
              <div>
                Missing <span className="colorDot missing"></span>
              </div>
              <div>Unique</div>
              <div>Most Common</div>
            </div>
            <div className="w-30">
              <div>{carList.length}</div>
              <div>0%</div>
              <div>0%</div>
              <div>{Object.keys(makerArray).length}</div>
              <div>{first?.value}</div>
            </div>
            <div className="w-10 others">
              <div>100%</div>
              <div>0%</div>
              <div>0%</div>
              <div></div>
              <div>{first?.percentage.toFixed(2) + "%"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
