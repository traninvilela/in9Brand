import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import { Head, Link } from "@inertiajs/react";
import { newspaperOutline, search } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { trashOutline, createOutline, eyeOutline } from "ionicons/icons";
import moment from "moment";
import { useState } from "react";
import { router } from "@inertiajs/react";
import ThSortable from "@/Admin/Components/Table/ThSortable";
import DropDownButton from "@/Admin/Components/Button/DropDownButton";
import { showAlert } from "@/Admin/Utils/SweetAlert.js";
import DeleteButton from "@/Admin/Components/Button/DeleteButton";
import CreateTagModal from "@/Admin/Pages/Tags/CreateModal";

export default function Index({ tags, sort }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedOption, setSelectedOption] = useState("Bulk Action");
    const [isMarkAll, setIsMarkAll] = useState(false);
    const [markItems, setMarkItems] = useState([]);
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [isUpdateModal, setIsUpdateModal] = useState(false);

    // handle search sort
    const getResults = (search) => {
        router.get(
            route("admin.tags.index", {
                search: search ?? setSearchQuery,
                sort: sort,
            }),
            {},
            { preserveState: true }
        );
    };

    // mark all
    const markAll = () => {
        if (isMarkAll) {
            setMarkItems([]);
            setIsMarkAll(false);
        } else {
            const items = tags.data.map((tag) => tag.id);
            setMarkItems(items);
            setIsMarkAll(true);
        }
    };

    // handle mark unmark
    const handleMark = (tagId) => {
        const existsMark = markItems.some((item) => item === tagId);
        if (existsMark) {
            const removeItem = markItems.filter((item) => item !== tagId);
            setMarkItems(removeItem);
        } else {
            const addedItem = [...markItems, tagId];
            setMarkItems(addedItem);
        }
    };

    // handle bulk action
    const handleBulkAction = () => {
        let confirmMessage = "";
        let action = "";

        if (selectedOption === "Delete") {
            confirmMessage = "You want to delete selected tags?";
            action = "admin.tags.bulk.delete";
        }
        setIsMarkAll([]);
        showAlert("Are you sure?", confirmMessage, selectedOption + "!", () => {
            router.delete(route(action, { ids: markItems.join(",") }));
        });
    };

    return (
        <>
            <Head title="All tags" />
            <AdminLayouts>
                <div className="yoo-height-b30 yoo-height-lg-b30" />
                <div className="container-fluid">
                    <div className="yoo-uikits-heading">
                        <h2 className="yoo-uikits-title">All tags</h2>
                    </div>
                    <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                    <div className="yoo-card yoo-style1">
                        <div className="yoo-card-heading">
                            <div className="yoo-card-heading-left">
                                <h2 className="yoo-card-title">
                                    <span className="yoo-card-title-icon yoo-blue-bg">
                                        <IonIcon
                                            icon={newspaperOutline}
                                            style={{
                                                width: "16px",
                                                height: "16px",
                                            }}
                                        />
                                    </span>
                                    tags
                                </h2>
                            </div>
                        </div>
                        <div className="yoo-card-body">
                            <div>
                                <div className="yoo-height-b15 yoo-height-lg-b15" />
                                <div className="yooDataTableWrap">
                                    <div className="dataTables_heading">
                                        <div className="dataTables_heading_left">
                                            <div className="yoo-group-btn">
                                                <div className="position-relative">
                                                    <DropDownButton
                                                        selectedOption={
                                                            selectedOption
                                                        }
                                                        disabled={
                                                            !markItems.length
                                                        }
                                                    >
                                                        <a
                                                            onClick={() =>
                                                                setSelectedOption(
                                                                    "Delete"
                                                                )
                                                            }
                                                            className={`dropdown-item ${
                                                                selectedOption ===
                                                                "Delete"
                                                                    ? "active"
                                                                    : ""
                                                            }`}
                                                            href="#"
                                                        >
                                                            Delete
                                                        </a>
                                                    </DropDownButton>
                                                </div>
                                                <button
                                                    disabled={!markItems.length}
                                                    onClick={() =>
                                                        handleBulkAction()
                                                    }
                                                    className="btn btn-success btn-sm"
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                        <div className="dataTables_heading_right">
                                            <div
                                                id="yooDataTable_filter"
                                                className="dataTables_filter"
                                            >
                                                <label>
                                                    <input
                                                        type="search"
                                                        className=""
                                                        placeholder="Search..."
                                                        value={searchQuery}
                                                        onChange={(e) => {
                                                            setSearchQuery(
                                                                e.target.value
                                                            );
                                                            getResults(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </label>
                                                <button className="dataTables_filter_btn">
                                                    <IonIcon icon={search} />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setIsCreateModal(true)
                                                }
                                                className="btn btn-success btn-sm yoo-table-btn1"
                                            >
                                                <span className="yoo-add">
                                                    +
                                                </span>{" "}
                                                Create New
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        id="yooDataTable_wrapper"
                                        className="dataTables_wrapper no-footer"
                                    >
                                        <table
                                            id="yooDataTable"
                                            className="display dataTable no-footer"
                                            style={{ width: "100%" }}
                                        >
                                            <thead>
                                                <tr role="row">
                                                    <th
                                                        onClick={() =>
                                                            markAll()
                                                        }
                                                        style={{ width: "1%" }}
                                                    >
                                                        <div
                                                            className={`yoo-check-mark-all ${
                                                                isMarkAll &&
                                                                "active"
                                                            }`}
                                                        >
                                                            <span className="yoo-first" />
                                                            <span className="yoo-last" />
                                                        </div>
                                                    </th>
                                                    <ThSortable
                                                        width="40%"
                                                        sort={sort}
                                                        onSorted={() =>
                                                            getResults(
                                                                searchQuery
                                                            )
                                                        }
                                                        column="name"
                                                    >
                                                        Name
                                                    </ThSortable>

                                                    <ThSortable
                                                        width="1%"
                                                        sort={sort}
                                                        onSorted={() =>
                                                            getResults(
                                                                searchQuery
                                                            )
                                                        }
                                                        column="post_count"
                                                    >
                                                        Posts
                                                    </ThSortable>

                                                    <ThSortable
                                                        width="15%"
                                                        sort={sort}
                                                        onSorted={() =>
                                                            getResults(
                                                                searchQuery
                                                            )
                                                        }
                                                        column="created_at"
                                                    >
                                                        Date
                                                    </ThSortable>
                                                    <th
                                                        style={{ width: "1%" }}
                                                        className="sorting"
                                                    >
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {tags.data.map((tag, index) => (
                                                    <tr
                                                        className="odd"
                                                        key={index}
                                                    >
                                                        <td
                                                            className="sorting_1"
                                                            onClick={() =>
                                                                handleMark(
                                                                    tag.id
                                                                )
                                                            }
                                                        >
                                                            <div
                                                                className={`yoo-check-mark ${
                                                                    markItems.some(
                                                                        (
                                                                            item
                                                                        ) =>
                                                                            item ===
                                                                            tag.id
                                                                    ) &&
                                                                    "active"
                                                                }`}
                                                            />
                                                        </td>
                                                        <td>{tag.name.en}</td>
                                                        <td>
                                                            <span className="yoo-table-medias yoo-style1">
                                                                <Link
                                                                    href={route(
                                                                        "admin.posts.index",
                                                                        {
                                                                            filter: {
                                                                                tag: tag.title,
                                                                            },
                                                                        }
                                                                    )}
                                                                >
                                                                    #
                                                                    {
                                                                        tag.post_count
                                                                    }
                                                                </Link>
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {moment(
                                                                tag.created_at
                                                            ).format("ll")}
                                                        </td>
                                                        <td>
                                                            <div
                                                                className="d-flex"
                                                                style={{
                                                                    gap: "5px",
                                                                }}
                                                            >
                                                                <DeleteButton
                                                                    href={route(
                                                                        "admin.tags.destroy",
                                                                        tag
                                                                    )}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {!tags.data.length && (
                                            <div
                                                className="no-data-found"
                                                style={{
                                                    textAlign: "center",
                                                    padding: "50px",
                                                }}
                                            >
                                                <p>No tags found!</p>
                                            </div>
                                        )}
                                        <div className="clear" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* .yoo-card */}
                    {tags.total > 1 && (
                        <div
                            className="pagination-wrapper"
                            style={{ marginTop: "10px" }}
                        >
                            <ul className="pagination">
                                {tags.links.map((link, index) => (
                                    <li
                                        className={`page-item ${
                                            link.active ? "active" : ""
                                        }`}
                                        key={`pagination_${index}`}
                                    >
                                        <Link
                                            href={link.url}
                                            className="page-link"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <div className="yoo-height-b30 yoo-height-lg-b30" />
                </div>
                <CreateTagModal
                    isModal={isCreateModal}
                    closeModal={(e) => setIsCreateModal(e)}
                />
            </AdminLayouts>
        </>
    );
}
