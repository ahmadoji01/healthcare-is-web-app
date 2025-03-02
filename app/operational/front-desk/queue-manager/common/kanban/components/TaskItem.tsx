import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDataModalContext } from "@/contexts/data-modal-context";
import { Visit } from "@/modules/visits/domain/visit";
import { useVisitContext } from "@/contexts/visit-context";
import { useTranslations } from "next-intl";

type TaskItemProps = {
  visit: Visit,
};

const TaskItem = ({ visit }: TaskItemProps) => {
  const { setEditModalOpen, setDeleteModalOpen } = useDataModalContext();
  const { setActivePatient, setActiveVisit } = useVisitContext();
  const t = useTranslations();

  return (
    <div className="mb-1 task rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="relative flex cursor-move justify-between">
        <div>
          <h5 className="mb-1 text-lg font-medium text-black dark:text-white">{visit?.patient.name}</h5>
          <p>{t("queue_number")}</p>
          <h4 className="text-xl font-medium text-black dark:text-white">{visit.queue_number}</h4>
        </div>
        <div className="items-center justify-center p-1 sm:flex xl:p-2">
          <ul className="flex items-center gap-1 2xsm:gap-2">
            <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
              <Link
                href=""
                onMouseDown={ () => { setActiveVisit(visit); setActivePatient(visit?.patient); setEditModalOpen(true) } }
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                >
                <FontAwesomeIcon width={18} height={18} icon={faBullhorn} />
              </Link>
            </motion.li>
            <motion.li className="relative" whileHover={{ scale: 1.2, transition: { duration: 0.2 }}} whileTap={{ scale:0.9 }} >  
              <Link
                href=""
                style={{ background: "red" }}
                onMouseDown={ () => { setActiveVisit(visit); setDeleteModalOpen(true)} }
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                >
                <FontAwesomeIcon width={18} height={18} icon={faTrash} style={{ color: 'white' }} />
              </Link>
            </motion.li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;