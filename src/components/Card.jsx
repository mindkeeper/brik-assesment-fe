import { Skeleton } from "antd";
import React from "react";
import { MdDescription } from "react-icons/md";
import { FaWeightHanging } from "react-icons/fa";
import delimiterFormatter from "../utils/delimiterFormatter";
export default function Card({ data, loading }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl h-60 overflow-hidden shadow-sm hover:shadow-lg text text-black dark:text-white flex flex-col">
      <div className="flex-1 relative bg-white">
        {loading ? (
          <Skeleton.Image
            active
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        ) : (
          <div>
            <img
              src={data.image}
              alt={data.name}
              className="w-full aspect-[3] object-contain"
            />
          </div>
        )}
      </div>
      <div className="p-2 bottom-0 w-full bg-white dark:bg-gray-900 border-0 border-t border-solid border-t-gray-300 dark:border-t-gray-600 flex flex-1 flex-col gap-1">
        {loading ? (
          <Skeleton.Input size="small" active />
        ) : (
          <h3 className="font-bold text-base line-clamp-1 m-0 capitalize">
            {data.name}
          </h3>
        )}
        {loading ? (
          <Skeleton.Input size="small" active block />
        ) : (
          <div className="flex flex-wrap gap-4 text-xs">
            <>
              <span className="flex items-center capitalize gap-1">
                <MdDescription className="text-gray-900" />
                <span className="w-20 truncate">{data?.description}</span>
              </span>
              <span className="flex items-center uppercase gap-1">
                <FaWeightHanging className="text-gray-900" />
                {data?.weight}
              </span>
            </>
          </div>
        )}
        {loading ? (
          <Skeleton.Input active />
        ) : (
          <h3
            className="font-bold text-[#ff6a30] text-xl m-0 line-clamp-1"
            title={`Rp ${delimiterFormatter(data.price)}`}
          >
            Rp {delimiterFormatter(data.price)}
          </h3>
        )}
      </div>
    </div>
  );
}
