import * as React from "react";
import axios from "axios";

interface IWeather {
  last_updated?: string;
  last_updated_epoch?: number;
  temp_c?: number;
  feelslike_c?: number;
  condition?: {
    text?: string;
  };
  wind_kph?: number;
  wind_degree?: number;
  pressure_in?: number;
  precip_mm?: number;
  humidity?: number;
  cloud?: number;
  uv?: number;
  gust_kph?: number;
  message?: string;
}

interface IHome {}

const Home: React.FC<IHome> = () => {
  const [data, setData] = React.useState<IWeather>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>("");
  const [subValue, setSubValue] = React.useState<string>("");

  const handleSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://api.weatherapi.com/v1/current.json",
      params: { key: process.env.NEXT_PUBLIC_API_KEY, q: value },
    };

    axios
      .request(options)
      .then(function (response) {
        setData(response.data?.current);
      })
      .catch(function (error) {
        setData({ message: `Không tìm thấy vị trí phù hợp.` });
        console.error(error);
      });
    setSubValue(value);
    setValue("");
  };

  const handleOnchange = (e: React.BaseSyntheticEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center bg-gray-100 p-10 text-gray-800">
      <div className="flex w-full max-w-xl flex-grow flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="flex h-0 flex-grow flex-col overflow-auto p-4">
          <div className="mt-2 flex w-full max-w-xs space-x-3">
            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
            <div>
              <div className="rounded-r-lg rounded-bl-lg bg-gray-300 p-3">
                <p className="text-sm">Welcome to my Weather App</p>
              </div>
              <span className="text-xs leading-none text-gray-500">now</span>
            </div>
          </div>
          {subValue.length > 0 ? (
            <div className="mt-2 ml-auto flex w-full max-w-xs justify-end space-x-3">
              <div>
                <div className="rounded-l-lg rounded-br-lg bg-blue-600 p-3 text-white">
                  <p className="text-sm">{subValue}</p>
                </div>
                <span className="text-xs leading-none text-gray-500">now</span>
              </div>
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
            </div>
          ) : (
            <></>
          )}

          {isLoading ? (
            <div className="mt-2 flex w-full max-w-xs space-x-3">
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
              <div>
                <div className="rounded-r-lg rounded-bl-lg bg-gray-300 p-3">
                  <p className="text-sm">...</p>
                </div>
                <span className="text-xs leading-none text-gray-500">now</span>
              </div>
            </div>
          ) : data?.message ? (
            <div className="mt-2 flex w-full max-w-xs space-x-3">
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
              <div>
                <div className="rounded-r-lg rounded-bl-lg bg-gray-300 p-3">
                  <p className="text-sm">{data?.message}</p>
                </div>
                <span className="text-xs leading-none text-gray-500">now</span>
              </div>
            </div>
          ) : data?.cloud ? (
            <div className="mt-2 flex w-full max-w-xs space-x-3">
              <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300"></div>
              <div>
                <div className="rounded-r-lg rounded-bl-lg bg-gray-300 p-3">
                  <p className="text-sm">Thời tiết tại {subValue} hôm nay.</p>
                  <p className="text-sm">
                    Độ che phủ của mây theo tỷ lệ phần trăm : {data?.cloud}
                  </p>
                  <p className="text-sm">
                    Điều kiện thời tiết : {data?.condition?.text}
                  </p>
                  <p className="text-sm">Nhiệt độ : {data?.feelslike_c}</p>
                  <p className="text-sm">
                    Gió giật tính bằng km trên giờ : {data?.gust_kph}
                  </p>
                  <p className="text-sm">
                    Độ ẩm theo phần trăm : {data?.humidity}
                  </p>
                  <p className="text-sm">
                    Giờ địa phương khi dữ liệu thời gian thực được cập nhật:{" "}
                    {data?.last_updated}
                  </p>
                  <p className="text-sm">
                    Giờ địa phương khi dữ liệu thời gian thực được cập nhật theo
                    thời gian unix : {data?.last_updated_epoch}
                  </p>
                  <p className="text-sm">
                    Lượng mưa tính bằng milimét : {data?.precip_mm}
                  </p>
                  <p className="text-sm">
                    Áp suất tính bằng inch : {data?.pressure_in}
                  </p>
                  <p className="text-sm">
                    Nhiệt độ tính bằng độ C : {data?.temp_c}
                  </p>
                  <p className="text-sm">Chỉ số UV : {data?.uv}</p>
                  <p className="text-sm">
                    Hướng gió theo độ : {data?.wind_degree}
                  </p>
                </div>
                <span className="text-xs leading-none text-gray-500">now</span>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative flex bg-gray-300 p-4">
            <input
              className=" flex h-10 w-full items-center rounded px-3 text-sm"
              type="text"
              placeholder="Nhập tên thành phố"
              value={value}
              onChange={handleOnchange}
            />
            <button
              type="submit"
              aria-label="Add to favorites"
              className="absolute right-5 bottom-5"
            >
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.61 2.64548C20.1948 2.19021 21.6568 3.65224 21.2016 5.23705L17.1785 19.2417C16.5079 21.5761 13.3904 22.0197 12.1096 19.9629L10.3338 17.1113C9.84262 16.3226 9.96155 15.2974 10.6207 14.6383L14.4111 10.8479C14.8022 10.4567 14.8033 9.82357 14.4134 9.43373C14.0236 9.04389 13.3905 9.04497 12.9993 9.43614L9.20901 13.2265C8.54987 13.8856 7.52471 14.0046 6.73596 13.5134L3.88412 11.7375C1.82737 10.4567 2.27092 7.33918 4.60532 6.66858L18.61 2.64548Z"
                  fill="#2563EB"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
