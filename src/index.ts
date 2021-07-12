import "reflect-metadata";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import { container } from "tsyringe";
import { Minty } from "./Minty";

const minty = container.resolve(Minty);
minty.start();
