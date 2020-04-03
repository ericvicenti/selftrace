enum Status {
  NIL,
  REQUESTING,
  SUCCESS,
  ERROR,
}

class Progress {
  private message: string;
  private status: Status;

  static createNil(): Progress {
    return new Progress('', Status.NIL);
  }

  static createRequesting(message: string): Progress {
    return new Progress(message, Status.REQUESTING);
  }

  static createSuccess(message: string): Progress {
    return new Progress(message, Status.SUCCESS);
  }

  static createError(message: string): Progress {
    return new Progress(message, Status.ERROR);
  }

  constructor(message: string, status: Status) {
    this.message = message;
    this.status = status;
  }

  isNil(): boolean {
    return this.status === Status.NIL;
  }

  isRequesting(): boolean {
    return this.status === Status.REQUESTING;
  }

  isSuccess(): boolean {
    return this.status === Status.SUCCESS;
  }

  isError(): boolean {
    return this.status === Status.ERROR;
  }

  getMessage(): string {
    return this.message;
  }
}

export { Progress };
