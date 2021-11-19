import { hash } from "bcryptjs";

import { initDB } from "../../src/db";
import { User, UserRole } from "../../src/models/User";

(async () => {
  await initDB();

  const passwordHash = await hash("foobar123", 10);
  const admin = new User({
    email: "foo@bar.com",
    passwordHash,
    role: UserRole.ADMIN,
  });

  await admin.save();
})();
